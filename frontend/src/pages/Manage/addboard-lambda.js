import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

// Initialize DynamoDB DocumentClient
const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event)); // Log the event for debugging

    try {
        // Parse the JSON body
        const { userId, boardName, description } = JSON.parse(event.body || '{}');

        // Validate required fields
        if (!userId || !boardName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Both userId and boardName are required' }),
            };
        }

        // Fetch the user's existing boards from the `users` table
        const getUserParams = {
            TableName: "users",
            Key: { userId },
            ProjectionExpression: "boards", // Fetch only the boards attribute
        };

        const userResponse = await dynamoDb.send(new GetCommand(getUserParams));
        const userBoards = userResponse.Item?.boards || [];

        // Check if the board name already exists in the user's boards
        const isBoardNameTaken = userBoards.some((board) => board.boardName === boardName);
        if (isBoardNameTaken) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "You already have a board with this name. Please choose a different name." }),
            };
        }

        // Generate a unique ID for the new board
        const boardId = uuidv4().slice(0,12);
        console.log('Item to be inserted into boards table:', {
            boardId,
            boardName,
            description,
            createdAt: new Date().toISOString(),
        });

        // Define transaction parameters
        const params = {
            TransactItems: [
                {
                    // Update the user's boards list in the `users` table
                    Update: {
                        TableName: "users",
                        Key: { userId },
                        UpdateExpression: "SET boards = list_append(if_not_exists(boards, :emptyList), :newBoard)",
                        ExpressionAttributeValues: {
                            ":newBoard": [{ boardId, boardName, description }], // include description here
                            ":emptyList": [],
                        },
                        ReturnValuesOnConditionCheckFailure: "NONE",
                    },
                },
                {
                    // Create the new board entry in the `boards` table
                    Put: {
                        TableName: "boards",
                        Item: {
                            boardId,
                            boardName,
                            description, // include description here
                            createdAt: new Date().toISOString(),
                            tokens: [],
                            userId,
                        },
                        ReturnValuesOnConditionCheckFailure: "NONE",
                    },
                },
            ],
        };

        // Perform the transactional write operation
        await dynamoDb.send(new TransactWriteCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Board appended to user and created successfully",
                board: { boardId, boardName, description }, // include description in response
            }),
        };
    } catch (error) {
        console.error('Error appending board or creating board:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
