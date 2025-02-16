import logger from '@cloud-burger/logger';
import {
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEvent,
} from 'aws-lambda';
import { AuthorizeController } from './utils/models';

export class AuthorizerHandler {
  constructor(private readonly controller: AuthorizeController) {}

  async handler(
    event: APIGatewayRequestAuthorizerEvent,
  ): Promise<APIGatewayAuthorizerResult> {
    try {
      const { principalId } = await this.controller({
        methodArn: event.methodArn,
        type: event.type,
        headers: event.headers,
      });

      return {
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: 'execute-api:Invoke',
              Resource: event.methodArn,
            },
          ],
        },
        principalId: principalId ?? 'not-identified',
      };
    } catch (error) {
      logger.error({
        message: 'Error while request authorize',
        data: {
          error,
          errorString: JSON.stringify(error),
        },
      });
      return {
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Deny',
              Action: 'execute-api:Invoke',
              Resource: event.methodArn,
            },
          ],
        },
        principalId: event.headers['x-identification'],
      };
    }
  }
}
