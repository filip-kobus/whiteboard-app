import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { boardId, username } = JSON.parse(event.body || '{}');

        if (!boardId || !username) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'boardId and username are required' }),
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
        const usernameExists = existingTokens.some((token) => token.username === username);

        if (usernameExists) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Username already exists' }),
            };
        }

        const generatedToken = uuidv4();
        const newToken = { token: boardId + generatedToken, username };

        const updateBoardParams = {
            TableName: "boards",
            Key: { boardId },
            UpdateExpression: "SET tokens = list_append(if_not_exists(tokens, :emptyList), :newToken)",
            ExpressionAttributeValues: {
                ":newToken": [newToken],
                ":emptyList": [],
            },
            ReturnValues: "UPDATED_NEW",
        };

        await dynamoDb.send(new UpdateCommand(updateBoardParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Token added successfully', token: newToken }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};