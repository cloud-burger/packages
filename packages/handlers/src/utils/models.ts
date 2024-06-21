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
  url: string;
  host: string;
  originalUrl: string;
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
