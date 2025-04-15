import { APIGatewayProxyEvent } from 'aws-lambda';
import { lowerCaseHeaders } from './lower-case-headers';
import { Request } from './models';
import { parseBody } from './parse-body';
import { removeEmpty } from './remove-empty';

export const parseLambdaRequest = (event: APIGatewayProxyEvent): Request => {
  const headers = lowerCaseHeaders(event.headers);

  return {
    id: event.requestContext?.requestId,
    headers,
    body: parseBody(event),
    ip: event.requestContext?.identity?.sourceIp,
    method: event.httpMethod?.toUpperCase(),
    params: {
      ...removeEmpty(event.pathParameters),
      ...removeEmpty(event.queryStringParameters),
    },
    pathParameters: removeEmpty(event.pathParameters),
    path: event.path,
    query: removeEmpty(event.queryStringParameters),
    user: removeEmpty({
      id: event.requestContext?.authorizer?.claims?.sub,
      email: event.requestContext?.authorizer?.claims?.email,
    }),
  };
};
