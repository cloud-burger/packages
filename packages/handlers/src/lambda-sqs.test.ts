import { SQSEvent } from 'aws-lambda';
import { NotFoundError } from './index';
import { LambdaSqsHandler } from './lambda-sqs';

describe('Lambda SQS Handler', () => {
  it('should execute worker successfully', async () => {
    const worker = async () => Promise.resolve();

    const lambdaSqsHandler = new LambdaSqsHandler(worker);

    await lambdaSqsHandler.handler({
      Records: [
        {
          body: '{"amount": 10}',
          messageId: '123',
        },
      ],
    } as unknown as SQSEvent);
  });

  it('should throw invalid json error', async () => {
    const worker = async () => Promise.resolve();

    const lambdaSqsHandler = new LambdaSqsHandler(worker);

    await expect(
      lambdaSqsHandler.handler({
        Records: [
          {
            body: undefined,
            messageId: '123',
          },
        ],
      } as unknown as SQSEvent),
    ).rejects.toThrow('Invalid JSON');
  });

  it('should throw treated error', async () => {
    const worker = async () => Promise.reject(new NotFoundError('Not found'));

    const lambdaSqsHandler = new LambdaSqsHandler(worker);

    await expect(
      lambdaSqsHandler.handler({
        Records: [
          {
            body: '{"amount": 10}',
            messageId: '123',
          },
        ],
      } as unknown as SQSEvent),
    ).rejects.toThrow('Not found');
  });

  it('should throw untreated error', async () => {
    const worker = async () => Promise.reject(new Error('Error'));

    const lambdaSqsHandler = new LambdaSqsHandler(worker);

    await expect(
      lambdaSqsHandler.handler({
        Records: [
          {
            body: '{"amount": 10}',
            messageId: '123',
          },
        ],
      } as unknown as SQSEvent),
    ).rejects.toThrow('Error');
  });
});
