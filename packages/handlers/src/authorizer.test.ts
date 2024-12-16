import { AuthorizerHandler } from './authorizer';
import NotFoundError from './errors/not-found-error';

describe('Authorizer', () => {
  it('should return principal id allow', async () => {
    const controller = async () => {
      return Promise.resolve({
        principalId: '1234567890',
      });
    };

    const authHandler = new AuthorizerHandler(controller);

    const response = await authHandler.handler({
      headers: {
        'x-identification': '1234567890',
      },
      methodArn: 'arn',
      type: 'REQUEST',
    } as any);

    expect(response).toEqual({
      policyDocument: {
        Statement: [
          { Action: 'execute-api:Invoke', Effect: 'Allow', Resource: 'arn' },
        ],
        Version: '2012-10-17',
      },
      principalId: '1234567890',
    });
  });

  it('should return not identified allow', async () => {
    const controller = async () => {
      return Promise.resolve({});
    };

    const authHandler = new AuthorizerHandler(controller);

    const response = await authHandler.handler({
      headers: {
        'x-identification': '1234567890',
      },
      methodArn: 'arn',
      type: 'REQUEST',
    } as any);

    expect(response).toEqual({
      policyDocument: {
        Statement: [
          { Action: 'execute-api:Invoke', Effect: 'Allow', Resource: 'arn' },
        ],
        Version: '2012-10-17',
      },
      principalId: 'not-identified',
    });
  });

  it('should return principal id deny', async () => {
    const controller = async () => {
      return Promise.reject(new NotFoundError('user not found'));
    };

    const authHandler = new AuthorizerHandler(controller);

    const response = await authHandler.handler({
      headers: {
        'x-identification': '1234567890',
      },
      methodArn: 'arn',
      type: 'REQUEST',
    } as any);

    expect(response).toEqual({
      policyDocument: {
        Statement: [
          { Action: 'execute-api:Invoke', Effect: 'Deny', Resource: 'arn' },
        ],
        Version: '2012-10-17',
      },
      principalId: '1234567890',
    });
  });
});
