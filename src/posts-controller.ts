import middleware from "./lib/middleware";
import validator from "@middy/validator";
import {bodySchema, responseSchema} from "./schema";
import {APIGatewayProxyEventV2} from "aws-lambda";


async function test(event, context) {
    const { id } = event.pathParameters;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello User ${id}` }),
    };
}

export const handlerTest = middleware(test)
    .use(validator({responseSchema}));