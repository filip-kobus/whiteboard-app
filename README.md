# Whiteboard App
A simple whiteboard app built on the [tldraw](https://tldraw.dev/) framework. Users can create accounts and generate unique tldraw boards. Each board can have a permalink, allowing others to access the board without needing to log in.

## How to Run the frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/filip-kobus/whiteboard-app
   ```

2. Navigate to the project directory:
   ```bash
   cd whiteboard-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the necessary environment variables (e.g., authentication API URL, etc.) based on the `.env.example` file, or as required by your project.

5. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

---

## Backend Overview

This project includes a serverless backend for user, board, and token management, as well as real-time collaboration and asset uploads.

- **Lambdas (`/lambdas`)**: AWS Lambda functions (Node.js) for user, board, and token management, using DynamoDB as the data store. Includes endpoints for adding/removing users and boards, managing tokens, and verifying access. See [`lambdas/README.md`](./lambdas/README.md) for details and example payloads.
- **WebSocket Worker (`/websocket/worker`)**: Cloudflare Worker and Durable Object for real-time collaboration and asset management. Handles WebSocket connections for live board sync, and asset uploads/downloads to R2 storage. See [`websocket/worker/README.md`](./websocket/worker/README.md) for endpoints and usage.

---

## Environment Variables

- Create a `.env` file in the root directory.
- Add any required variables such as:
  ```bash
  REACT_APP_API_URL=http://your-api-url
  ```
