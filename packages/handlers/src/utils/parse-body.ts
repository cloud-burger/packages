import { APIGatewayProxyEvent } from 'aws-lambda';
import { removeEmpty } from './remove-empty';

export const parseBody = (event: APIGatewayProxyEvent) => {
  if (!event.body) return;

  let parsedBody = event.body;

  if (event.isBase64Encoded) {
    const buff = Buffer.from(event.body, 'base64');
    parsedBody = buff.toString('utf8');
  }

  parsedBody = JSON.parse(parsedBody);

  return removeEmpty(parsedBody);
};
