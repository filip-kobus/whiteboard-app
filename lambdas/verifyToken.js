import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { token, teacher } = event.queryStringParameters || {};

        if (!token || token.length < 12) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid token' }),
            };
        }

        const boardId = token.substring(0, 12);

        const getBoardParams = {
            TableName: "boards",
            Key: { boardId },
        };

        const boardResult = await dynamoDb.send(new GetCommand(getBoardParams));

        if (!boardResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Board not found' }),
            };
        }

        if (teacher === "true") {
            const userId = boardResult.Item.userId;
            const trueToken = boardId + userId;

            if (token!=trueToken) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'You are not a teacher' }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ username: "Admin" }),
            };
        }
        const tokens = boardResult.Item.tokens || [];
        const tokenEntry = tokens.find((entry) => entry.token === token);

        if (!tokenEntry) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid token' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ username: tokenEntry.username }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};