import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    try {
        const { boardId } = event.queryStringParameters || {};

        if (!boardId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'boardId is required' }),
            };
        }

        const getBoardParams = {
            TableName: "boards",
            Key: { boardId },
        };

        const boardResult = await dynamoDb.send(new GetCommand(getBoardParams));

        const boardExists = !!boardResult.Item;

        return {
            statusCode: 200,
            body: JSON.stringify({ exists: boardExists }),
        };
    } catch (error) {
        console.error("Error checking board existence:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};