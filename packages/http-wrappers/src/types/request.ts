export interface AxiosRequest<T = any> {
  url: string;
  params?: { [key: string]: any };
  headers?: { [key: string]: string };
  data?: T;
  timeout?: number;
}
