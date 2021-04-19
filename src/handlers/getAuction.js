import AWS from "aws-sdk";
import createHttpError from "http-errors";
import { commonMiddleware } from "../../lib/middleware/commonMiddleware";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const AliAuctionsTable = process.env.ALI_AUCTIONS_TABLE_NAME;

export async function getAuctionById(id) {
	const results = await dynamoDb
		.get({
			TableName: AliAuctionsTable,
			Key: {
				id,
			},
		})
		.promise();

	if (results.Item == null) {
		console.error(error);
		throw new createHttpError.NotFound(`Auction with ID ${id} not found.`);
	}

	return results;
}

async function getAuction(event, context) {
	const { id } = event.pathParameters;

	const results = getAuctionById(id);

	return {
		statusCode: 200,
		body: JSON.stringify(results.Item),
	};
}

export const handler = commonMiddleware(getAuction);
