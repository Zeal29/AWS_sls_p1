import AWS from "aws-sdk";
import createHttpError from "http-errors";
import { commonMiddleware } from "../../lib/middleware/commonMiddleware";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const AliAuctionsTable = process.env.ALI_AUCTIONS_TABLE_NAME;
async function getAuctions(event, context) {
	try {
		const results = await dynamoDb
			.scan({
				TableName: AliAuctionsTable,
			})
			.promise();

		return {
			statusCode: 200,
			body: JSON.stringify(results.Items),
		};
	} catch (error) {
		console.error(error);
		throw new createHttpError.InternalServerError(errors);
	}
}

export const handler = commonMiddleware(getAuctions);
