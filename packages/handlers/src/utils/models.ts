import { SQSMessageAttributes } from 'aws-lambda';

export interface Message<T> {
  body: T;
  id: string;
  messageAttributes: SQSMessageAttributes;
}

export declare type Worker<T = any> = (messages: Message<T>[]) => Promise<void>;

export interface Request {
  id: string;
  body?: any;
  headers: {
    [key: string]: string | undefined;
  };
  ip: string;
  method: string;
  params: Record<string, string>;
  path: string;
  pathParameters: {
    [name: string]: string | undefined;
  };
  query: {
    [key: string]: string | undefined;
  };
  url?: string;
  host?: string;
  originalUrl?: string;
}

export interface Response<T = any> {
  statusCode?: number;
  headers?: {
    [header: string]: boolean | number | string;
  };
  body?: T;
}

export declare type Controller<T = any> = (
  request: Request,
) => Promise<Response<T> | void>;

export interface AuthorizeRequest {
  type: string;
  methodArn: string;
  headers: {
    [key: string]: string | undefined;
  };
}

export interface AuthorizeResponse {
  principalId?: string;
}

export declare type AuthorizeController = (
  request: AuthorizeRequest,
) => Promise<AuthorizeResponse>;
