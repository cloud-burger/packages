export interface AxiosResponse<T = any> {
  status: number;
  data: T;
  headers?: { [key: string]: string };
}
