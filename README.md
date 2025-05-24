# Whiteboard App

A collaborative whiteboard application built on the powerful [tldraw](https://tldraw.dev/) framework. This app enables users to create accounts, generate unique interactive whiteboards, and share them with others through secure permalink access - no login required for viewers!

## Table of Contents

- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend Architecture](#backend-architecture)
- [Deployment Guide](#deployment-guide)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whiteboard-app
   ```

2. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Configure your environment** (see [Environment Configuration](#environment-configuration))

4. **Deploy the backend** (see [Deployment Guide](#deployment-guide))

## Frontend

The React frontend provides a user-friendly interface for creating and managing whiteboards, user accounts, and collaborative drawing sessions. Built with React 18, AWS Amplify for authentication, and Tldraw for real-time collaboration.

For detailed setup instructions, features, and architecture, see [`frontend/README.md`](./frontend/README.md).

## Backend Architecture

This project implements a modern serverless architecture combining AWS and Cloudflare services.

### System Components

#### **Lambda Functions** (`/lambdas`)
AWS Lambda functions built with Node.js:
- **User Management**: Registration, authentication, profile management
- **Board Operations**: Create, delete, and manage whiteboard metadata
- **Token System**: Generate and manage secure shareable links
- **Data Storage**: DynamoDB integration for persistent data

📚 **Documentation**: [`lambdas/README.md`](./lambdas/README.md)

#### **WebSocket Worker** (`/websocket/worker`)
Cloudflare Workers with Durable Objects power real-time features:
- **Live Collaboration**: WebSocket connections for real-time board sync
- **Asset Management**: File uploads/downloads with R2 storage
- **Room State**: Persistent room management and user presence
- **Performance**: Global edge network for low-latency connections

📚 **Documentation**: [`websocket/worker/README.md`](./websocket/worker/README.md)

## Deployment Guide

This project uses a serverless architecture designed for cheap, on-demand workflow.

### Architecture Overview

![Architecture Diagram](architecture.svg)

### AWS Services

#### **Frontend Hosting**
- **Amazon S3**: Static website hosting
- **CloudFront**: Global CDN with HTTPS

#### 🔌 **Backend API**
- **API Gateway**: REST endpoints
- **Lambda Functions**: Serverless compute
- **DynamoDB**: NoSQL database with the following tables:
  - `users`: User profiles and board associations
  - `boards`: Board metadata, tokens, and access control

#### **Authentication**
- **Amazon Cognito**: Complete user management solution
  - User pools for registration and authentication
  - Email verification workflows
  - JWT token generation and validation
  - AWS Amplify SDK integration

### Cloudflare Services

#### **Real-time Features**
- **Cloudflare Workers**: WebSocket handling
- **Durable Objects**: Managing boards states
- **R2 Storage**: Storage for assets

---

### Step-by-Step Deployment

#### 1️⃣ **AWS Infrastructure Setup**

**Deploy Lambda Functions:**
```bash
# Package and deploy Lambda functions
cd lambdas
zip -r lambda-functions.zip .
# Upload via AWS Console or use SAM/CDK for automated deployment
```

**Create Database Tables:**
```bash
# Create Users table
aws dynamodb create-table \
  --table-name users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create Boards table
aws dynamodb create-table \
  --table-name boards \
  --attribute-definitions AttributeName=boardId,AttributeType=S \
  --key-schema AttributeName=boardId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

**Configure API Gateway:**
- Create REST API
- Set up Lambda proxy integrations
- Deploy to production stage

**Set up Cognito:**
- Create User Pool
- Configure App Client for frontend integration
- Set up Amplify authentication

#### 2️⃣ **Cloudflare Workers Setup**

```bash
cd websocket
npm install

# Configure wrangler.toml with your account details
npx wrangler deploy

# Set up R2 bucket for asset storage
npx wrangler r2 bucket create whiteboard-assets
```

#### 3️⃣ **Frontend Deployment**

```bash
cd frontend
npm install
npm run build

# Deploy to S3
aws s3 sync build/ s3://your-whiteboard-bucket

# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

### Environment Configuration

Configure these environment variables across all services for proper integration:

#### **Frontend Environment** (`.env.local`)
```bash
# AWS Cognito Configuration
REACT_APP_COGNITO_CLIENT_ID="your-cognito-client-id"
REACT_APP_COGNITO_USER_POOL_ID="your-user-pool-id"

# API Endpoints
REACT_APP_API_URL="https://your-api-gateway-url"
REACT_APP_TLDRAW_WORKER_URL="https://your-cloudflare-worker-url"

# Application URLs
REACT_APP_HOST_URL="https://your-domain.com"
```

#### **Cloudflare Worker** (`wrangler.toml`)
```toml
[vars]
API_URL = "https://your-api-gateway-url/doesboardexist"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "whiteboard-assets"
```

#### **Lambda Environment Variables**
Configure in AWS Console or deployment scripts:
```bash
# DynamoDB table names
USERS_TABLE="users"
BOARDS_TABLE="boards"

# Other AWS service configurations
AWS_REGION="eu-central-1"
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
---
