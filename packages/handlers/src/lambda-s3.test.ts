import { S3Event } from 'aws-lambda';
import NotFoundError from './errors/not-found-error';
import { LambdaS3Handler } from './lambda-s3';

describe('Lambda S3 handler', () => {
  it('should execute worker successfully', async () => {
    const worker = async () => Promise.resolve();
    const lambdaS3Handler = new LambdaS3Handler(worker);

    await lambdaS3Handler.handler({
      Records: [
        {
          eventName: 'test',
          eventTime: '2024-01-01',
          s3: {
            bucket: {
              name: 'files',
            },
            object: {
              key: 'test',
            },
          },
        },
      ],
    } as unknown as S3Event);
  });

  it('should throw invalid record', async () => {
    const worker = async () => Promise.resolve();
    const lambdaS3Handler = new LambdaS3Handler(worker);

    await expect(
      lambdaS3Handler.handler({
        Records: [
          {
            eventName: 'test',
            eventTime: '2024-01-01',
            s3: {
              object: {
                key: 'test',
              },
            },
          },
        ],
      } as unknown as S3Event),
    ).rejects.toThrow('Invalid record');
  });

  it('should throw treated error', async () => {
    const worker = async () => Promise.reject(new NotFoundError('Not found'));
    const lambdaS3Handler = new LambdaS3Handler(worker);

    await expect(
      lambdaS3Handler.handler({
        Records: [
          {
            eventName: 'test',
            eventTime: '2024-01-01',
            s3: {
              bucket: {
                name: 'files',
              },
              object: {
                key: 'test',
              },
            },
          },
        ],
      } as unknown as S3Event),
    ).rejects.toThrow('Not found');
  });

  it('should throw untreated error', async () => {
    const worker = async () => Promise.reject(new Error('Error'));
    const lambdaS3Handler = new LambdaS3Handler(worker);

    await expect(
      lambdaS3Handler.handler({
        Records: [
          {
            eventName: 'test',
            eventTime: '2024-01-01',
            s3: {
              bucket: {
                name: 'files',
              },
              object: {
                key: 'test',
              },
            },
          },
        ],
      } as unknown as S3Event),
    ).rejects.toThrow('Error');
  });
});
