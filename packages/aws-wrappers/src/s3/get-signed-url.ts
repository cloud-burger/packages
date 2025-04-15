import { GetObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl as getSignedUrlCommand } from '@aws-sdk/s3-request-presigner';

const s3 = new S3({ region: process.env.AWS_REGION || 'us-east-1' });

const getSignedUrl = async (
  command: GetObjectCommand | PutObjectCommand,
  expiresIn: number = 3600,
): Promise<string> => {
  return await getSignedUrlCommand(s3, command, { expiresIn });
};

export default getSignedUrl;
