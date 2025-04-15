import { GetObjectCommand } from '@aws-sdk/client-s3';
import { mock } from 'jest-mock-extended';
import getSignedUrl from './get-signed-url';

jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');

describe('S3 - Get signed url', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should get signed url', async () => {
    const mockParams = mock<GetObjectCommand>();

    await getSignedUrl(mockParams);
  });
});
