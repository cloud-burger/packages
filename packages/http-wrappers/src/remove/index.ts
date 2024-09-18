import { defaultRequest } from '../request';
import { AxiosRequest } from '../types/request';
import { AxiosResponse } from '../types/response';

export const remove = async <T>(
  request: AxiosRequest,
): Promise<AxiosResponse<T>> => {
  return await defaultRequest('DELETE', request);
};
