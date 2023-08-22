# Google Bard API
[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/t0t1.svg)](https://status.nishantapps.in/?utm_source=status_badge)
```markdown
# Express Chat Application with Google AI Generative Language

This is a simple Express application that uses the Google AI Generative Language API to generate responses to user input.

## Installation

1. Clone this repository.
2. Install the required dependencies using the following command:
   ```sh
   npm install
   ```

## Configuration

1. Set up a Google Cloud project and enable the Discuss API.
2. Obtain an API key and replace `process.env.plamkey` with your API key.
3. Set up a `.env` file and add your environment variables:
   ```env
   PORT=3000
   ```

## Usage

1. Run the application using the following command:
   ```sh
   node index.js
   ```
2. Access the application at `http://localhost:3000`.
3. Send a GET request to the root route with a `text` header to generate a response.

## API Endpoint

- **Endpoint:** `/`
- **Method:** GET
- **Headers:**
  - `text`: The user input text for generating a response.
- **Response:** JSON object containing the generated response.

## Error Handling

If an error occurs during message generation, the server will respond with a default error message.

## Dependencies

- `express`: Web application framework for Node.js.
- `@google-ai/generativelanguage`: Google AI Generative Language client library.
- `google-auth-library`: Google Cloud authentication library.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
