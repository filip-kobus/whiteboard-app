# Whiteboard App
A simple whiteboard app built on the [tldraw](https://tldraw.dev/) framework. Users can create accounts and generate unique tldraw boards. Each board can have a permalink, allowing others to access the board without needing to log in.

## Frontend

The React frontend provides a user-friendly interface for creating and managing whiteboards, user accounts, and collaborative drawing sessions. Built with React 18, AWS Amplify for authentication, and Tldraw for real-time collaboration.

For detailed setup instructions, features, and architecture, see [`frontend/README.md`](./frontend/README.md).

---

## Backend Overview

This project includes a serverless backend for user, board, and token management, as well as real-time collaboration and asset uploads.

- **Lambdas (`/lambdas`)**: AWS Lambda functions (Node.js) for user, board, and token management, using DynamoDB as the data store. Includes endpoints for adding/removing users and boards, managing tokens, and verifying access. See [`lambdas/README.md`](./lambdas/README.md) for details and example payloads.
- **WebSocket Worker (`/websocket/worker`)**: Cloudflare Worker and Durable Object for real-time collaboration and asset management. Handles WebSocket connections for live board sync, and asset uploads/downloads to R2 storage. See [`websocket/worker/README.md`](./websocket/worker/README.md) for endpoints and usage.

---

## Environment Variables

- Create a `.env.local` file in the frontend directory.
- Add required variables such as:
  ```bash
  REACT_APP_COGNITO_CLIENT_ID="your-cognito-client-id"
  REACT_APP_COGNITO_USER_POOL_ID="your-user-pool-id"
  REACT_APP_API_URL=http://your-api-url
  REACT_APP_TLDRAW_WORKER_URL=http://your-cloudflare-worker-url
  REACT_APP_HOST_URL=domain_of_hosted_app
  ```
