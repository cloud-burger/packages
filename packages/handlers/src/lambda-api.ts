import logger from '@cloud-burger/logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import InternalServerError from './errors/internal-server-error';
import { defaultHeaders } from './utils/constants';
import { Controller } from './utils/models';
import { parseLambdaRequest } from './utils/parse-lambda-request';

export class LambdaApiHandler {
  constructor(private readonly controller: Controller) {}

  async handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const request = parseLambdaRequest(event);

      const response = await this.controller(request);

      if (!response || !response.body) {
        return {
          body: '',
          headers: defaultHeaders,
          isBase64Encoded: false,
          statusCode: 204,
        };
      }

      let result = response.body;

      if (typeof result !== 'string') {
        result = JSON.stringify(result);
      }

      return {
        headers: {
          ...response.headers,
          ...defaultHeaders,
        },
        statusCode: response.statusCode || 200,
        isBase64Encoded: false,
        body: result,
      };
    } catch (error) {
      if (error.isTreated) {
        return {
          headers: defaultHeaders,
          statusCode: error.statusCode,
          isBase64Encoded: false,
          body: JSON.stringify(error.toObject()),
        };
      }

      logger.error(error);

      return {
        headers: defaultHeaders,
        statusCode: 500,
        isBase64Encoded: false,
        body: JSON.stringify(new InternalServerError().toObject()),
      };
    }
  }
}
