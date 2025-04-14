import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3,
} from '@aws-sdk/client-s3';

const s3 = new S3({ region: process.env.AWS_REGION || 'us-east-1' });

const putObject = async (
  params: PutObjectCommandInput,
): Promise<PutObjectCommandOutput> => {
  const command = new PutObjectCommand(params);

  return await s3.send(command);
};

export default putObject;
