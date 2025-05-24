# 📝 Whiteboard App

A collaborative whiteboard application built on the powerful [tldraw](https://tldraw.dev/) framework. This app enables users to create accounts, generate unique interactive whiteboards, and share them with others through secure permalink access - no login required for viewers!

## ✨ Key Features

- 🎨 **Interactive Whiteboards**: Create unlimited drawing boards with full tldraw functionality
- 👥 **Real-time Collaboration**: Multiple users can collaborate simultaneously on the same board
- 🔗 **Shareable Links**: Generate secure permalinks for instant board access
- 🔐 **User Authentication**: Secure account system with AWS Cognito
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- ☁️ **Serverless Architecture**: Scalable backend with AWS Lambda and Cloudflare Workers

## 📖 Table of Contents

- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend Architecture](#backend-architecture)
- [Deployment Guide](#deployment-guide)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)

## 🚀 Getting Started

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

## 🎨 Frontend

The React frontend provides a user-friendly interface for creating and managing whiteboards, user accounts, and collaborative drawing sessions. Built with React 18, AWS Amplify for authentication, and Tldraw for real-time collaboration.

For detailed setup instructions, features, and architecture, see [`frontend/README.md`](./frontend/README.md).

## 🔧 Backend Architecture

This project implements a modern serverless architecture combining AWS and Cloudflare services for optimal performance, scalability, and real-time capabilities.

### 🏗️ System Components

#### 📊 **Lambda Functions** (`/lambdas`)
AWS Lambda functions built with Node.js handle core business logic:
- **User Management**: Registration, authentication, profile management
- **Board Operations**: Create, delete, and manage whiteboard metadata
- **Token System**: Generate and manage secure shareable links
- **Data Storage**: DynamoDB integration for persistent data

📚 **Documentation**: [`lambdas/README.md`](./lambdas/README.md)

#### ⚡ **WebSocket Worker** (`/websocket/worker`)
Cloudflare Workers with Durable Objects power real-time features:
- **Live Collaboration**: WebSocket connections for real-time board sync
- **Asset Management**: File uploads/downloads with R2 storage
- **Room State**: Persistent room management and user presence
- **Performance**: Global edge network for low-latency connections

📚 **Documentation**: [`websocket/worker/README.md`](./websocket/worker/README.md)

## 🚀 Deployment Guide

This project uses a serverless architecture designed for high availability and global performance.

### 🏗️ Architecture Overview

```
Frontend (React) → CloudFront → S3
     ↓
API Gateway → Lambda Functions → DynamoDB
     ↓
Cloudflare Workers → Durable Objects → R2 Storage
```

### ☁️ AWS Services

#### 🌐 **Frontend Hosting**
- **Amazon S3**: Static website hosting for React build files
- **CloudFront**: Global CDN with HTTPS termination and SPA routing
- **Route 53**: Domain management (optional)

#### 🔌 **Backend API**
- **API Gateway**: REST endpoints with CORS support and request validation
- **Lambda Functions**: Serverless compute for business logic execution
- **DynamoDB**: NoSQL database with the following tables:
  - `users`: User profiles and board associations
  - `boards`: Board metadata, tokens, and access control

#### 🔐 **Authentication**
- **Amazon Cognito**: Complete user management solution
  - User pools for registration and authentication
  - Email verification workflows
  - JWT token generation and validation
  - AWS Amplify SDK integration

### ⚡ Cloudflare Services

#### 🤝 **Real-time Features**
- **Cloudflare Workers**: Edge computing for WebSocket handling
- **Durable Objects**: Stateful room management and user presence
- **R2 Storage**: Cost-effective asset storage for images and room snapshots

---

### 📋 Step-by-Step Deployment

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
- Create REST API with CORS enabled
- Set up Lambda proxy integrations
- Deploy to production stage

**Set up Cognito:**
- Create User Pool with email verification
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

### 🔧 Environment Configuration

Configure these environment variables across all services for proper integration:

#### 🎨 **Frontend Environment** (`.env.local`)
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

#### ⚡ **Cloudflare Worker** (`wrangler.toml`)
```toml
[vars]
API_URL = "https://your-api-gateway-url/doesboardexist"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "whiteboard-assets"
```

#### 🔧 **Lambda Environment Variables**
Configure in AWS Console or deployment scripts:
```bash
# DynamoDB table names
USERS_TABLE="users"
BOARDS_TABLE="boards"

# Other AWS service configurations
AWS_REGION="us-east-1"
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- 📖 Check the documentation in each component's README
- 🐛 Report issues via GitHub Issues
- 💬 Join discussions in GitHub Discussions

---

**Built with ❤️ using modern serverless technologies**