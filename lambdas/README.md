# Whiteboard App Lambdas

This directory contains AWS Lambda functions (Node.js) for the Whiteboard App backend. Each Lambda handles a specific API endpoint for user, board, and token management, using DynamoDB as the data store.

## Overview of Lambdas

- **addBoard.js**: Adds a new board for a user. Ensures unique board names per user and creates a board entry in the `boards` table.
- **removeBoard.js**: Removes a board from a user's list and deletes the board from the `boards` table.
- **addUser.js**: Registers a new user in the `users` table.
- **getUser.js**: Retrieves user data by `userId` from the `users` table.
- **addToken.js**: Adds a new token (with username) to a board. Ensures usernames are unique per board.
- **removeToken.js**: Removes a token from a board's token list.
- **updateTokenTimestamp.js**: Updates the timestamp and usage counter for a token on a board, tracking activity and total minutes.
- **verifyToken.js**: Verifies a token for a board, distinguishing between teacher and student tokens, and returns the associated username.
- **doesBoardExist.js**: Checks if a board exists in the `boards` table.
- **getTokens.js**: Retrieves all tokens for a given board.

## Usage

These lambdas are designed to be deployed as serverless functions (e.g., via AWS Lambda + API Gateway). They expect requests from the frontend or other services, and interact with DynamoDB for persistent storage.

## Example Event Payloads

- **addBoard**:
  ```json
  {
    "userId": "user-123",
    "boardName": "Math Board",
    "description": "Algebra lessons"
  }
  ```
- **addUser**:
  ```json
  {
    "userId": "user-123",
    "boards": [],
    "email": "user@example.com",
    "isVerified": false
  }
  ```
- **addToken**:
  ```json
  {
    "boardId": "board-abc",
    "username": "student1"
  }
  ```

---

For more details, see the code in each file.
