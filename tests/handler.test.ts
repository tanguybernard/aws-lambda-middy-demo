

// invokes the handler, note that property foo is missing
import {handler} from "../src";
// handler.test.ts
import { describe, it, expect } from 'vitest';
import {
    APIGatewayProxyEventV2,
    APIGatewayProxyResultV2,
    Context
} from 'aws-lambda';

describe('Handler Tests', () => {
    it('should return 200 for GET /user/{id}', async () => {

        const event : APIGatewayProxyEventV2 = {
            headers: {
                'Content-Type': 'application/json'
            },
            isBase64Encoded: false,
            body: '{}',
            rawPath: '/user/123',
            rawQueryString: '',
            requestContext: {
                http: {
                    method: 'GET',
                    path: '/user/123'
                }
            } as any,
            pathParameters: { id: '123' },
            routeKey: 'GET /user/{id}',
            version: '2.0'
        };




        const context: Context = {} as any;

        const result:  APIGatewayProxyResultV2 = await handler(event , context);


        if ("statusCode" in result) {
            expect(result.statusCode).eq(200);
        }
    });

});
