import { randomUUID } from 'crypto';
import { Request } from 'express';
import logger from './index';

describe('Logger', () => {
  it('should log success', () => {
    logger.reset();
    logger.setLevel('debug');
    logger.setEvent('core', {
      headers: {
        'x-user-id': randomUUID(),
        'x-user-email': 'test@gmail.com',
      },
      method: 'POST',
      hostname: 'localhost',
      url: 'http://localhost:3000',
    } as unknown as Request);

    expect(logger.getConfig()).toEqual({
      created_at: expect.any(String),
      host: 'localhost',
      http: { method: 'POST', url: 'http://localhost:3000' },
      requestId: expect.any(String),
      service: 'core',
      type: 'log',
      user: {
        email: 'test@gmail.com',
        id: expect.any(String),
      },
    });

    logger.setEvent('core', undefined as any);

    logger.trace('test');
    logger.debug('test');
    logger.info('test');
    logger.warn('test');
    logger.error('test');

    expect(logger.getConfig()).toEqual({
      created_at: expect.any(String),
      requestId: expect.any(String),
      service: 'core',
      type: 'log',
    });
  });
});
