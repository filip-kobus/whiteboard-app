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

## Deployment

This project uses a serverless architecture with multiple cloud providers for optimal performance and scalability.

### AWS Services

#### Frontend Hosting
- **S3**: Static website hosting for the React frontend build files
- **CloudFront**: Global CDN for fast content delivery and HTTPS termination
- Configure CloudFront to serve `index.html` for all routes (SPA routing)

#### Backend API
- **API Gateway**: REST API endpoints for HTTP requests, handles CORS and request routing
- **Lambda Functions**: Serverless compute for business logic (see `/lambdas` directory)
- **DynamoDB**: NoSQL database with tables:
  - `users`: User profiles and board associations
  - `boards`: Board metadata and token lists

#### Authentication
- **Cognito**: User authentication and management
  - User pools for sign-up/sign-in
  - Email verification
  - JWT token generation
  - Integration with AWS Amplify SDK

### Cloudflare Services

#### Real-time Collaboration
- **Cloudflare Workers**: WebSocket handling and real-time sync (see `/websocket/worker`)
- **Durable Objects**: Stateful objects for room management and persistence
- **R2 Storage**: Asset storage for images/videos and room snapshots

### Deployment Steps

1. **AWS Setup**:
   ```bash
   # Deploy Lambda functions
   zip lambda-functions.zip lambdas/*
   # Upload to Lambda via AWS Console or CLI
   
   # Create DynamoDB tables
   aws dynamodb create-table --table-name users --attribute-definitions AttributeName=userId,AttributeType=S --key-schema AttributeName=userId,KeyType=HASH
   aws dynamodb create-table --table-name boards --attribute-definitions AttributeName=boardId,AttributeType=S --key-schema AttributeName=boardId,KeyType=HASH
   
   # Configure API Gateway endpoints to trigger Lambda functions
   # Set up Cognito User Pool and configure Amplify
   ```

2. **Cloudflare Setup**:
   ```bash
   cd websocket
   npm install
   
   # Deploy worker
   npx wrangler deploy
   
   # Configure R2 bucket and Durable Objects in wrangler.toml
   ```

3. **Frontend Deployment**:
   ```bash
   cd frontend
   npm run build
   
   aws s3 sync build/ s3://your-bucket-name
   # Configure CloudFront distribution
   ```

### Environment Configuration

Set up these environment variables across services:

- **Frontend** (`.env.local`):
  ```bash
   REACT_APP_COGNITO_CLIENT_ID="your-cognito-client-id"
   REACT_APP_COGNITO_USER_POOL_ID="your-user-pool-id"
   REACT_APP_API_URL=http://your-api-url
   REACT_APP_TLDRAW_WORKER_URL=http://your-cloudflare-worker-url
   REACT_APP_HOST_URL=domain_of_hosted_app
  ```

- **Cloudflare Worker** (`wrangler.toml`):
  ```toml
  [vars]
  API_URL = "https://your-api-gateway-url/doesboardexist"
  ```