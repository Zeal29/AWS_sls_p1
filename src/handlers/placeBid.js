import AWS from "aws-sdk";
import createHttpError from "http-errors";
import { commonMiddleware } from "../../lib/middleware/commonMiddleware";
import { getAuctionById } from "./getAuction";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const AliAuctionsTable = process.env.ALI_AUCTIONS_TABLE_NAME;
async function placeBid(event, context) {
	const { id } = event.pathParameters;

	const { amount } = event.body;

	const { Item: auction } = await getAuctionById(id);

	if (auction.highestBid.amount <= amount) {
		throw new createHttpError.Forbidden(`you bid must be higher then ${auction.highestBid.amount}`);
	}

	const param = {
		TableName: AliAuctionsTable,
		Key: {
			id,
		},
		UpdateExpression: "set highestBid.amount = :amount",
		ExpressionAttributeValues: {
			":amount": amount,
		},
		ReturnValues: "ALL_NEW",
	};

	try {
		const results = await dynamoDb.update(param).promise();

		return {
			statusCode: 200,
			body: JSON.stringify(results.Attributes),
		};
	} catch (error) {
		console.error(error);
		throw new createHttpError.InternalServerError(error);
	}
}

export const handler = commonMiddleware(placeBid);
