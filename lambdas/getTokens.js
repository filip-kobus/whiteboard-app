import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event)); // Log the event for debugging

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

        if (!boardResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Board not found' }),
            };
        }

        const tokens = (boardResult.Item.tokens || []).map(tokenEntry => {
            let latestTimestamp = null;
            if (Array.isArray(tokenEntry.timestamps) && tokenEntry.timestamps.length > 0) {
                const last = tokenEntry.timestamps[tokenEntry.timestamps.length - 1];
                latestTimestamp = last.timestamp || null;
            }
            const totalMinutes = typeof tokenEntry.totalMinutes === 'number' ? tokenEntry.totalMinutes : 0;
            return {
                ...tokenEntry,
                latestTimestamp,
                totalMinutes,
            };
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ tokens }),
        };
    } catch (error) {
        console.error("Error fetching tokens:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};