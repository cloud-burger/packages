import { defaultRequest } from '../request';
import { AxiosRequest } from '../types/request';
import { AxiosResponse } from '../types/response';

export const put = async <T>(
  request: AxiosRequest,
): Promise<AxiosResponse<T>> => {
  return await defaultRequest('PUT', request);
};
