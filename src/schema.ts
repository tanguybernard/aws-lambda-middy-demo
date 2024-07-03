import {transpileSchema} from "@middy/validator/transpile";

export const bodySchema = {
    type: 'object',
    properties: {
        subject: { type: 'string', maxLength: 100 },
        content: { type: 'string', maxLength: 100 }
    },
    required: ['subject', 'content'],
    additionalProperties: false
} as const


export const responseSchema = transpileSchema({
    type: 'object',
    required: ['body', 'statusCode'],
    properties: {
        body: {
            type: 'string'
        },
        statusCode: {
            type: 'number'
        }
    }
})