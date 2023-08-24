const express = require('express');
const translate = require('translate-api');
const app = express();
const port = process.env.PORT;
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.plamkey),
});

app.get('/', async (req, res) => {
  const headers = req.headers;
  if (!headers['text']) {
    return res.json({ response: "Text is missing in the headers." });
  }

  try {
    const content = headers['text'];
    let translation = content;

    // Check if lang is provided in headers and perform translation if needed
    if (headers['lang']) {
      const supportedLanguages = await translate.getLangs();

      // Check if the provided lang is valid
      if (!supportedLanguages.includes(headers['lang'])) {
        const supportedLangsMessage = `Invalid language provided. Supported languages are: ${supportedLanguages.join(', ')}`;
        return res.json({ response: supportedLangsMessage });
      }

      // Translate the input text to English first
      translation = await translate(content, { from: 'auto', to: 'en' });

      // Translate the English text to the specified language
      translation = await translate(translation.text, { to: headers['lang'] });
    }

    const result = await client.generateMessage({
      model: "models/chat-bison-001",
      prompt: {
        context: "Respond to all questions in a paragraph. ",
        messages: [{ content: translation }],
      },
    });

    let responseContent = result[0].candidates[0].content;

    // Translate the generated response to the specified language
    if (headers['lang']) {
      responseContent = await translate(responseContent, { to: headers['lang'] });
    }

    res.json({ response: responseContent });
  } catch (error) {
    res.json({ response: `Sometimes something goes wrong!` });
    console.error("Error generating message:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
