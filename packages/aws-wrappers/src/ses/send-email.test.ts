import { SendEmailCommandInput } from '@aws-sdk/client-ses';
import { mock } from 'jest-mock-extended';
import sendEmail from './send-email';

jest.mock('@aws-sdk/client-ses');

describe('SQS - Send email', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should send email', async () => {
    const mockParams = mock<SendEmailCommandInput>();

    await sendEmail(mockParams);
  });
});
