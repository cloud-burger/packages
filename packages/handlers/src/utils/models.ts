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
  user?: {
    id?: string;
    email?: string;
  };
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

export interface S3Message {
  bucket: string;
  key: string;
  eventName: string;
  eventTime: string;
  raw: any;
}

export type S3Worker = (messages: S3Message[]) => Promise<void>;
