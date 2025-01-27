import {
  SendMessageCommandInput,
  SendMessageCommandOutput,
  SQS,
} from '@aws-sdk/client-sqs';

const sqs = new SQS({ region: 'us-east-1' });

const sendMessage = async (
  params: SendMessageCommandInput,
): Promise<SendMessageCommandOutput> => {
  return await sqs.sendMessage(params);
};

export default sendMessage;
