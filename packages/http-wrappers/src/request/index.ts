import { TimeoutError } from '@cloud-burger/handlers';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { constants } from 'node:crypto';
import { Agent } from 'node:https';
import { AxiosRequest } from '../types/request';
import { AxiosResponse } from '../types/response';

const config: AxiosRequestConfig = {
  httpsAgent: new Agent({
    rejectUnauthorized: false,
    secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT,
  }),
};

export const defaultRequest = async <T>(
  method: Method,
  request: AxiosRequest,
): Promise<AxiosResponse<T>> => {
  try {
    return await axios.request({
      method,
      ...request,
      ...config,
      ...(request.timeout && { timeout: request.timeout }),
    });
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new TimeoutError(
        `Response time exceeded on integration ${request.url}`,
      );
    }

    throw error;
  }
};
