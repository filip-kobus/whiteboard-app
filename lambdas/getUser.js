import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { userId } = event.queryStringParameters || {};

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'UserId is required' }),
            };
        }

        const params = {
            TableName: "users",
            Key: { userId },
        };

        const data = await dynamoDb.send(new GetCommand(params));

        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};