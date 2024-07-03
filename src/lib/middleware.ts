
import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";


export default handler => middy<APIGatewayProxyEventV2, APIGatewayProxyResultV2>(handler)
    .use(jsonBodyParser())
    .use(httpEventNormalizer())



/*

.use([
    httpJsonBodyParser(), // Ce middleware ne posera pas de problème si le corps est absent
    httpErrorHandler(),
    httpEventNormalizer()
]);
 */