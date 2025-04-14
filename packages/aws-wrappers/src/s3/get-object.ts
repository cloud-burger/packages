import {
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  S3,
} from '@aws-sdk/client-s3';

const s3 = new S3({ region: process.env.AWS_REGION || 'us-east-1' });

const getObject = async (
  params: GetObjectCommandInput,
): Promise<GetObjectCommandOutput> => {
  const command = new GetObjectCommand(params);

  return await s3.send(command);
};

export default getObject;
