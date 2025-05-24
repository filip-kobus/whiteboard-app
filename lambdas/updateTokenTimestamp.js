import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        let token, append;
        if (event.queryStringParameters) {
            token = event.queryStringParameters.token;
            append = event.queryStringParameters.append === "true";
        } else if (event.body) {
            const body = JSON.parse(event.body);
            token = body.token;
            append = body.append === true || body.append === "true";
        }

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

        const tokens = boardResult.Item.tokens || [];
        const tokenIndex = tokens.findIndex(entry => entry.token === token);
        if (tokenIndex === -1) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Token not found on board' }),
            };
        }

        let timestamps = tokens[tokenIndex].timestamps || [];
        let totalMinutes = typeof tokens[tokenIndex].totalMinutes === 'number' ? tokens[tokenIndex].totalMinutes : 0;

        totalMinutes += 1;

        if (append && timestamps.length > 0) {
            const lastIndex = timestamps.length - 1;
            const lastTimestamp = timestamps[lastIndex];
            const newCounter = (typeof lastTimestamp.counter === "number" ? lastTimestamp.counter : 1) + 1;
            timestamps[lastIndex] = {
                ...lastTimestamp,
                counter: newCounter,
            };
        } else {
            timestamps = [
                ...timestamps,
                { timestamp: Date.now(), counter: 1 }
            ];
        }

        const updatedTokens = tokens.map((entry, idx) =>
            idx === tokenIndex ? { ...entry, timestamps, totalMinutes } : entry
        );

        const updateParams = {
            TableName: "boards",
            Key: { boardId },
            UpdateExpression: "SET tokens = :tokens",
            ExpressionAttributeValues: {
                ":tokens": updatedTokens,
            },
            ReturnValues: "UPDATED_NEW",
        };
        await dynamoDb.send(new UpdateCommand(updateParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Timestamps and totalMinutes updated', timestamps, totalMinutes }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};