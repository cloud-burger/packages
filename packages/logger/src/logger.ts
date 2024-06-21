import { randomUUID } from 'crypto';
import { Request } from 'express';
import pino from 'pino';
const LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

interface Config {
  user?: { id: string; email: string };
  host?: string;
  http?: { method: string; url: string };
  requestId?: string;
  service?: string;
}

export class Logger {
  config: Config;
  pino: pino.Logger;

  constructor() {
    this.config = {};
    this.pino = pino({
      base: null,
      timestamp: false,
      messageKey: 'message',
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
    });
    this.setLevel(process.env.LOGGER_LEVEL || LEVELS[0]);
  }

  setLevel(level: string) {
    if (level && LEVELS.includes(level)) {
      this.pino.level = level;
    }
  }

  setService(service: string) {
    this.config.service = service;
  }

  setRequestId(requestId: string) {
    this.config.requestId = requestId;
  }

  setHttp(method: string, url: string, host: string) {
    const http = {
      method,
      url,
    };

    this.config.http = http;
    this.config.host = host;
  }

  setUser(id: string, email: string) {
    const user = {
      id,
      email,
    };

    this.config.user = user;
  }

  reset() {
    this.config = {};
  }

  getConfig() {
    return {
      created_at: new Date().toISOString(),
      type: 'log',
      ...this.config,
    };
  }

  setEvent(service: string, event: Request) {
    this.reset();
    this.setService(service);
    this.setRequestId(randomUUID());

    if (!event) {
      return;
    }

    const { headers } = event;

    this.setUser(
      headers['x-user-id'] as string,
      headers['x-user-email'] as string,
    );
    this.setHttp(event.method, event.url, event.hostname);
  }

  trace(log) {
    const config = this.getConfig();
    this.pino.child(config).trace(log);
  }

  debug(log) {
    const config = this.getConfig();
    this.pino.child(config).debug(log);
  }

  info(log) {
    const config = this.getConfig();
    this.pino.child(config).info(log);
  }

  warn(log) {
    const config = this.getConfig();
    this.pino.child(config).warn(log);
  }

  error(log) {
    const config = this.getConfig();
    this.pino.child(config).error(log);
  }
}
