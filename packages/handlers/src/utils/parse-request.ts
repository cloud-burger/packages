import { randomUUID } from 'crypto';
import { Request as ExpressRequest } from 'express';
import { lowerCaseHeaders } from './lower-case-headers';
import { Request } from './models';
import { removeEmpty } from './remove-empty';

export const parseRequest = (request: ExpressRequest): Request => {
  const headers = lowerCaseHeaders(request.headers);

  return {
    id: randomUUID(),
    headers,
    url: request.baseUrl,
    ip: request.ip,
    method: request.method,
    originalUrl: request.originalUrl,
    params: {
      ...removeEmpty(request.params),
      ...removeEmpty(request.query),
    },
    pathParameters: removeEmpty(request.params),
    path: request.path,
    query: removeEmpty(request.query),
    body: request.body,
    host: request.hostname,
  };
};
