import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpEventHandler from "@middy/http-error-handler";
import createHttpError from "http-errors";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const AliAuctionsTable = process.env.ALI_AUCTIONS_TABLE_NAME;
async function createAuction(event, context) {
	const { title } = event.body;

	const now = new Date();

	const auction = {
		id: uuid(),
		title,
		status: "open",
		createdAt: now.toISOString(),
	};

	try {
		await dynamoDb
			.put({
				TableName: AliAuctionsTable,
				Item: auction,
			})
			.promise();
	} catch (error) {
		console.error(error);
		throw new createHttpError.InternalServerError(errors);
	}

	return {
		statusCode: 201,
		body: JSON.stringify({ auction }),
	};
}

export const handler = middy(createAuction).use(httpJsonBodyParser()).use(httpEventNormalizer()).use(httpEventHandler());
