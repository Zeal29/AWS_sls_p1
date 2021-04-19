import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpEventHandler from "@middy/http-error-handler";

export const commonMiddleware = (handler) => middy(handler).use(httpJsonBodyParser()).use(httpEventNormalizer()).use(httpEventHandler());
