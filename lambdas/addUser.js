import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const { userId, boards, email, isVerified } = JSON.parse(event.body);

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'userId is required' }),
            };
        }

        const params = {
            TableName: "users",
            Item: {
                userId,
                boards: boards || [],
                createdAt: new Date().toISOString()
            },
        };

        await dynamoDb.send(new PutCommand(params));

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User created successfully', userId }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
