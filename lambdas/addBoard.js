import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { userId, boardName, description } = JSON.parse(event.body || '{}');

        if (!userId || !boardName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Both userId and boardName are required' }),
            };
        }

        const getUserParams = {
            TableName: "users",
            Key: { userId },
            ProjectionExpression: "boards",
        };

        const userResponse = await dynamoDb.send(new GetCommand(getUserParams));
        const userBoards = userResponse.Item?.boards || [];

        const isBoardNameTaken = userBoards.some((board) => board.boardName === boardName);
        if (isBoardNameTaken) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "You already have a board with this name. Please choose a different name." }),
            };
        }

        const boardId = uuidv4().slice(0,12);

        const params = {
            TransactItems: [
                {
                    Update: {
                        TableName: "users",
                        Key: { userId },
                        UpdateExpression: "SET boards = list_append(if_not_exists(boards, :emptyList), :newBoard)",
                        ExpressionAttributeValues: {
                            ":newBoard": [{ boardId, boardName, description }],
                            ":emptyList": [],
                        },
                        ReturnValuesOnConditionCheckFailure: "NONE",
                    },
                },
                {
                    Put: {
                        TableName: "boards",
                        Item: {
                            boardId,
                            boardName,
                            createdAt: new Date().toISOString(),
                            tokens: [],
                            userId,
                        },
                        ReturnValuesOnConditionCheckFailure: "NONE",
                    },
                },
            ],
        };

        await dynamoDb.send(new TransactWriteCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Board appended to user and created successfully",
                board: { boardId, boardName },
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};