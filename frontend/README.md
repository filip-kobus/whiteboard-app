# Frontend - Whiteboard App

This is the React frontend for the Whiteboard App, built with React and AWS Cognito (ipmplemented via AWS amplify framework) for authentication. It provides a user-friendly interface for creating and managing whiteboards, user accounts, and collaborative drawing sessions.

## Tech Stack

- **React 18**
- **React Bootstrap**
- **AWS Cognito**
- **Tldraw**
- **Axios**

## Project Structure

```
src/
├── App.js
├── index.js
├── index.css
├── components/           # Reusable UI components
│   ├── ...
│   └── Navbar/
├── libs/                 # Utility libraries
│   ├── contextLib.js
│   └── fetchuser.js
└── pages/                # Page components
    ├── ...
    └── Register/
```

## Key Features

### Authentication
- User registration and login via AWS Cognito
- Protected routes for authenticated users

### Board Management
- Create new whiteboards with custom names and descriptions
- View all user's boards in a dashboard
- Delete boards
- Manage shareable links for board access

### Token System
- Generate unique permalinks for students to join boards
- Manage student access with usernames
- Copy shareable permalinks for easy distribution
- View usage statistics for each token
- Remove tokens when no longer needed

### Real-time Collaboration
- WebSocket-based real-time collaboration via Tldraw
- Asset upload support (images, videos)
- Automatic user presence and cursor tracking

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

4. Configure backend - covered in [TODO]

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
1. Receive a permalink from teacher
2. Enter permalink
3. Collaborate on the whiteboard in real-time

## API Integration

The frontend communicates with:
- **AWS Lambda Functions**: For user, board, and token management
- **Cloudflare Worker**: For real-time WebSocket connections and asset uploads
- **AWS Cognito**: For user authentication and management

---

For more details about the backend APIs, see the [lambdas README](../lambdas/README.md) and [websocket worker README](../websocket/worker/README.md).
