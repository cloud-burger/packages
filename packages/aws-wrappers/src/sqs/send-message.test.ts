import { SendMessageCommandInput, SQS } from '@aws-sdk/client-sqs';
import { mock } from 'jest-mock-extended';
import sendMessage from './send-message';

jest.mock('@aws-sdk/client-sqs');

describe('SQS - Send message', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should send message', async () => {
    const mockParams = mock<SendMessageCommandInput>({
      QueueUrl: 'queue-url',
      MessageBody: JSON.stringify({ amount: 10 }),
    });

    await sendMessage(mockParams);

    expect(SQS.prototype.sendMessage).toHaveBeenNthCalledWith(1, mockParams);
  });
});
