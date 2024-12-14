import { parseLambdaRequest } from './parse-lambda-request';

describe('Parse lambda request', () => {
  it('should parse lambda request', () => {
    expect(
      parseLambdaRequest({
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
      } as any),
    ).toEqual({
      body: { amount: 10 },
      headers: { 'request-id': '213' },
      id: '123',
      ip: '0.0.0.0',
      method: 'GET',
      params: {},
      path: '/test',
      pathParameters: {},
      query: {},
    });
  });

  it('should parse lambda request with optional params', () => {
    expect(
      parseLambdaRequest({
        headers: {
          'request-id': '213',
        },
        requestContext: null,
        body: JSON.stringify({
          amount: 10,
        }),
        isBase64Encoded: false,
        pathParameters: {},
        queryStringParameters: {},
        httpMethod: null,
        path: '/test',
      } as any),
    ).toEqual({
      body: { amount: 10 },
      headers: { 'request-id': '213' },
      id: undefined,
      ip: undefined,
      method: undefined,
      params: {},
      path: '/test',
      pathParameters: {},
      query: {},
    });
  });
});
