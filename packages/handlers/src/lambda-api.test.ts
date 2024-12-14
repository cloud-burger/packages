import { APIGatewayEvent } from 'aws-lambda';
import NotFoundError from './errors/not-found-error';
import { LambdaApiHandler } from './lambda-api';
describe('Lambda Api', () => {
  it('should return 204 when controller returns undefined', async () => {
    const controller = async () => {
      return Promise.resolve(undefined);
    };
    const lambdaApiHandler = new LambdaApiHandler(controller);

    const response = await lambdaApiHandler.handler({
      headers: {
        'request-id': '213',
      },
      requestContext: {
        requestId: '123',
        identity: {
          sourceIp: '0.0.0.0',
        },
      },
      body: JSON.stringify({
        amount: 10,
      }),
      isBase64Encoded: false,
      pathParameters: {},
      queryStringParameters: {},
      httpMethod: 'GET',
      path: '/test',
    } as unknown as APIGatewayEvent);

    expect(response).toEqual({
      body: '',
      headers: {
        'Access-Control-Allow-Headers':
          'Content-Type,x-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
      },
      isBase64Encoded: false,
      statusCode: 204,
    });
  });

  it('should return 200 when controller returns body', async () => {
    const controller = async () => {
      return Promise.resolve({
        body: { amount: 100 },
      });
    };
    const lambdaApiHandler = new LambdaApiHandler(controller);

    const response = await lambdaApiHandler.handler({
      headers: {
        'request-id': '213',
      },
      requestContext: {
        requestId: '123',
        identity: {
          sourceIp: '0.0.0.0',
        },
      },
      body: JSON.stringify({
        amount: 10,
      }),
      isBase64Encoded: false,
      pathParameters: {},
      queryStringParameters: {},
      httpMethod: 'GET',
      path: '/test',
    } as unknown as APIGatewayEvent);

    expect(response).toEqual({
      body: '{"amount":100}',
      headers: {
        'Access-Control-Allow-Headers':
          'Content-Type,x-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
      },
      isBase64Encoded: false,
      statusCode: 200,
    });
  });

  it('should return 404 when controller returns treated error', async () => {
    const controller = async () => {
      return Promise.reject(new NotFoundError('User not found'));
    };
    const lambdaApiHandler = new LambdaApiHandler(controller);

    const response = await lambdaApiHandler.handler({
      headers: {
        'request-id': '213',
      },
      requestContext: {
        requestId: '123',
        identity: {
          sourceIp: '0.0.0.0',
        },
      },
      body: JSON.stringify({
        amount: 10,
      }),
      isBase64Encoded: false,
      pathParameters: {},
      queryStringParameters: {},
      httpMethod: 'GET',
      path: '/test',
    } as unknown as APIGatewayEvent);

    expect(response).toEqual({
      body: '{"reason":"User not found"}',
      headers: {
        'Access-Control-Allow-Headers':
          'Content-Type,x-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
      },
      isBase64Encoded: false,
      statusCode: 404,
    });
  });

  it('should return 500 when controller returns untreated error', async () => {
    const controller = async () => {
      return Promise.reject(new Error('Unknown error'));
    };
    const lambdaApiHandler = new LambdaApiHandler(controller);

    const response = await lambdaApiHandler.handler({
      headers: {
        'request-id': '213',
      },
      requestContext: {
        requestId: '123',
        identity: {
          sourceIp: '0.0.0.0',
        },
      },
      body: JSON.stringify({
        amount: 10,
      }),
      isBase64Encoded: false,
      pathParameters: {},
      queryStringParameters: {},
      httpMethod: 'GET',
      path: '/test',
    } as unknown as APIGatewayEvent);

    expect(response).toEqual({
      body: '{"reason":"InternalServerError"}',
      headers: {
        'Access-Control-Allow-Headers':
          'Content-Type,x-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,PATCH,DELETE',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
      },
      isBase64Encoded: false,
      statusCode: 500,
    });
  });
});
