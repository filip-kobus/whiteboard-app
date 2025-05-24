import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { boardId, token } = JSON.parse(event.body || '{}');

        if (!boardId || !token) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'boardId and token are required' }),
            };
        }

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

        const existingTokens = boardResult.Item.tokens || [];
        const updatedTokens = existingTokens.filter((t) => t.token !== token);

        if (existingTokens.length === updatedTokens.length) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Token not found' }),
            };
        }

        const updateBoardParams = {
            TableName: "boards",
            Key: { boardId },
            UpdateExpression: "SET tokens = :updatedTokens",
            ExpressionAttributeValues: {
                ":updatedTokens": updatedTokens,
            },
            ReturnValues: "UPDATED_NEW",
        };

        await dynamoDb.send(new UpdateCommand(updateBoardParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Token removed successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};