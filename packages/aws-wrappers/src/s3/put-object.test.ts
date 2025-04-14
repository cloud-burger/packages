import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { mock } from 'jest-mock-extended';
import putObject from './put-object';

jest.mock('@aws-sdk/client-s3');

describe('S3 - put object', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should put s3 object', async () => {
    const mockParams = mock<PutObjectCommandInput>({
      Body: 'FILE',
    });

    await putObject(mockParams);
  });
});
