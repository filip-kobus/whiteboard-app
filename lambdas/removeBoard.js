import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const { userId, boardId } = JSON.parse(event.body || '{}');

    if (!userId || !boardId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Both userId and boardId are required' }),
      };
    }

    const getUserParams = {
      TableName: "users",
      Key: { userId },
    };

    const userResult = await dynamoDb.send(new GetCommand(getUserParams));

    if (!userResult.Item || !userResult.Item.boards) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User or boards not found' }),
      };
    }

    const boards = userResult.Item.boards;

    const boardIndex = boards.findIndex((board) => board.boardId === boardId);

    if (boardIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Board not found for this user' }),
      };
    }

    boards.splice(boardIndex, 1);

    const updateParams = {
      TableName: "users",
      Key: { userId },
      UpdateExpression: "SET boards = :updatedBoards",
      ExpressionAttributeValues: {
        ":updatedBoards": boards,
      },
      ReturnValues: "UPDATED_NEW",
    };

    const updateResult = await dynamoDb.send(new UpdateCommand(updateParams));

    const deleteParams = {
      TableName: "boards",
      Key: { boardId },
    };

    await dynamoDb.send(new DeleteCommand(deleteParams));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Board removed successfully from user and deleted from boards table",
        updatedAttributes: updateResult.Attributes,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
    };
  }
};
