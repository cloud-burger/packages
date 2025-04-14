import { GetObjectCommandInput } from '@aws-sdk/client-s3';
import { mock } from 'jest-mock-extended';
import getObject from './get-object';

jest.mock('@aws-sdk/client-s3');

describe('S3 - get object', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should get s3 object', async () => {
    const mockParams = mock<GetObjectCommandInput>();

    await getObject(mockParams);
  });
});
