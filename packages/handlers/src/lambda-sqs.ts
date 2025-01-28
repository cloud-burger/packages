import logger from '@cloud-burger/logger';
import { SQSEvent } from 'aws-lambda';
import InternalServerError from './errors/internal-server-error';
import { Worker } from './utils/models';

export class LambdaSqsHandler {
  constructor(private worker: Worker) {}

  private parseBody(body: string) {
    try {
      return {
        success: true,
        data: JSON.parse(body),
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async executeWorker(event: SQSEvent): Promise<void> {
    return await this.worker(
      event.Records.map((record) => {
        const parseResult = this.parseBody(record.body);

        if (!parseResult.success) {
          logger.error('Invalid JSON');
          throw new InternalServerError('Invalid JSON');
        }

        return {
          id: record.messageId,
          body: parseResult.data,
          messageAttributes: record.messageAttributes,
        };
      }),
    );
  }

  async handler(event: SQSEvent): Promise<void> {
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
