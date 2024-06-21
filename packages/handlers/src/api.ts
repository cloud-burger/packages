import { Request, Response } from 'express';
import InternalServerError from './errors/internal-server-error';
import { Controller } from './utils/models';
import { parseRequest } from './utils/parse-request';

export class ApiHandler {
  constructor(private readonly controller: Controller) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const parsedRequest = parseRequest(request);

      const res = await this.controller(parsedRequest);

      if (!res || !res.body) {
        return response.status(204).send();
      }

      return response.status(res.statusCode || 200).send(res.body);
    } catch (error) {
      if (error.isTreated) {
        return response.status(error.statusCode).send(error.toObject());
      }

      // logger.error(error)
      return response.status(500).send(new InternalServerError().toObject());
    }
  }
}
