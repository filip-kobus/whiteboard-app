# Frontend - Whiteboard App

This is the React frontend for the Whiteboard App, built with modern React patterns and AWS Cognito (ipmplemented via AWS amplify framework) for authentication. It provides a user-friendly interface for creating and managing whiteboards, user accounts, and collaborative drawing sessions.

## Tech Stack

- **React 18** with functional components and hooks
- **React Router** for client-side routing
- **React Bootstrap** for UI components and styling
- **AWS Amplify** for authentication and user management
- **Tldraw** for the collaborative whiteboard functionality
- **Axios** for API calls to the backend

## Project Structure

```
src/
├── App.js                 # Main app component with routing and context
├── index.js              # React app entry point
├── index.css             # Global styles
├── components/           # Reusable UI components
│   ├── Alert/           # Alert message component
│   ├── ConfirmEmail/    # Email confirmation flow
│   ├── Loading/         # Loading spinner component
│   ├── Navbar/          # Navigation bar
│   └── ProtectedRoute/  # Route protection for authenticated users
├── libs/                # Utility libraries
│   ├── contextLib.js    # React context for app state
│   └── fetchuser.js     # User fetching utilities
└── pages/               # Page components
    ├── About/           # About page
    ├── Account/         # User account management
    ├── Board/           # Collaborative whiteboard view
    ├── Home/            # Landing page
    ├── Join/            # Join whiteboard with token
    ├── Login/           # User authentication
    ├── Manage/          # Board management dashboard
    ├── NotFound/        # 404 error page
    ├── Register/        # User registration
    └── Tokens/          # Token management for boards
```

## Key Features

### Authentication
- User registration and login via AWS Cognito
- Protected routes for authenticated users
- Account management with user profile display

### Board Management
- Create new whiteboards with custom names and descriptions
- View all user's boards in a dashboard
- Delete boards with confirmation
- Generate shareable links for teacher access

### Token System
- Generate unique tokens for students to join boards
- Manage student access with usernames
- Copy shareable links for easy distribution
- View usage statistics for each token
- Remove tokens when no longer needed

### Real-time Collaboration
- WebSocket-based real-time collaboration via Tldraw
- Asset upload support (images, videos)
- Bookmark preview for pasted URLs
- Automatic user presence and cursor tracking
- Activity timestamp tracking

## Pages Overview

- **Home** (`/`): Landing page with sign-up options for teachers or join options for students
- **Login** (`/login`): User authentication with email/password
- **Register** (`/register`): New user registration with email verification
- **Manage** (`/`): Dashboard for authenticated users to manage their boards
- **Board** (`/board/:token`): Collaborative whiteboard interface
- **Join** (`/board`): Page for students to enter a board token
- **Tokens** (`/manage/:boardId`): Token management for a specific board
- **Account** (`/account`): User profile and logout functionality
- **About** (`/about`): Information about the application

## Environment Variables

Create a `.env.local` file in the frontend directory with:

```bash
REACT_APP_API_URL=https://your-api-gateway-url
REACT_APP_TLDRAW_WORKER_URL=https://your-cloudflare-worker-url
REACT_APP_HOST_URL=https://your-frontend-url
```

## Installation and Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see above)

4. Configure AWS Amplify authentication in your project

5. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## User Flows

### Teacher Flow
1. Register/Login as a teacher
2. Create new boards from the dashboard
3. Generate tokens for students
4. Share board links with students
5. Monitor student activity and manage access

### Student Flow
1. Receive a token/link from teacher
2. Enter token on join page or click direct link
3. Collaborate on the whiteboard in real-time
4. Activity is automatically tracked

## Key Components

- **AppContext**: Global state management for authentication and user data
- **ProtectedRoute**: Ensures only authenticated users can access certain pages
- **Tldraw Integration**: Handles real-time collaboration and whiteboard functionality
- **Token Management**: Generate, share, and manage student access tokens

## API Integration

The frontend communicates with:
- **AWS Lambda Functions**: For user, board, and token management
- **Cloudflare Worker**: For real-time WebSocket connections and asset uploads
- **AWS Cognito**: For user authentication and management

---

For more details about the backend APIs, see the [lambdas README](../lambdas/README.md) and [websocket worker README](../websocket/worker/README.md).
