import {
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
  SESClient,
} from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'us-east-1' });

const sendEmail = async (
  params: SendEmailCommandInput,
): Promise<SendEmailCommandOutput> => {
  return await ses.send(new SendEmailCommand(params));
};

export default sendEmail;
