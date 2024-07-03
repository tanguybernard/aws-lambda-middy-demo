import middy from '@middy/core'
import httpRouterHandler, {Method} from '@middy/http-router'
import validatorMiddleware from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import httpEventNormalizer from "@middy/http-event-normalizer";
import {bodySchema, responseSchema} from "./schema";
import jsonBodyParser from "@middy/http-json-body-parser";
import {APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyResultV2, Context} from "aws-lambda";
import {handlerTest} from "./posts-controller";
import middleware from "./lib/middleware";




type HandlerEvent = APIGatewayProxyEventV2;
type HandlerResult = APIGatewayProxyResultV2;



async function getHandlerV2(
    event: APIGatewayProxyEventV2,
    context: any
): Promise<APIGatewayProxyResultV2> {
    // the returned response will be checked against the type `APIGatewayProxyResultV2`
    console.log("event 👉", event);
    return {
        statusCode: 200,
        body: JSON.stringify(`Hello from ${event.rawPath}`),
    };
}

const postHandler = middy()
    .use(validatorMiddleware({eventSchema: transpileSchema(bodySchema), responseSchema }))
    .handler((event, context) => {
        return {
            statusCode: 200,
            body: JSON.stringify({ something: 'somethingelse' })
        }
    })


async function test(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(event.body),
    };
}

const routes = [
    {
        method: 'GET' as Method,
        path: '/user/{id}',
        handler: handlerTest
    },

]

// Define the types for your handlers


export const handler = middy()
    //.use(jsonBodyParser())
    .handler(httpRouterHandler(routes))
