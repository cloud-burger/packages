import logger from '@cloud-burger/logger';
import { S3Event, S3EventRecord } from 'aws-lambda';
import InternalServerError from './errors/internal-server-error';

export interface S3Message {
  bucket: string;
  key: string;
  eventName: string;
  eventTime: string;
  raw: S3EventRecord;
}

export type S3Worker = (messages: S3Message[]) => Promise<void>;

export class LambdaS3Handler {
  constructor(private worker: S3Worker) {}

  private parseRecord(record: S3EventRecord): S3Message {
    const { s3, eventName, eventTime } = record;

    try {
      return {
        bucket: s3.bucket.name,
        key: decodeURIComponent(s3.object.key.replace(/\+/g, ' ')),
        raw: record,
        eventName,
        eventTime,
      };
    } catch (error) {
      logger.error({
        message: 'Invalid record',
      });
      throw new InternalServerError('Invalid record');
    }
  }

  async executeWorker(event: S3Event): Promise<void> {
    return await this.worker(
      event.Records.map((record) => this.parseRecord(record)),
    );
  }

  async handler(event: S3Event): Promise<void> {
    try {
      return await this.executeWorker(event);
    } catch (error) {
      if (error.isTreated) {
        throw error;
      }

      logger.error(error);
      throw error;
    }
  }
}
