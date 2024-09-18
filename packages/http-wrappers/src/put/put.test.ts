import { defaultRequest } from '../request';
import { AxiosResponse } from '../types/response';
import { put } from './index';
jest.mock('../request');

describe('put', () => {
  const defaultRequestMock = defaultRequest as jest.MockedFunction<
    typeof defaultRequest
  >;

  it('should put successfully', async () => {
    defaultRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    } as AxiosResponse);

    const response = await put({
      url: 'localhost:8080',
    });

    expect(response).toEqual({ data: { test: true }, status: 200 });
    expect(defaultRequestMock).toHaveBeenNthCalledWith(1, 'PUT', {
      url: 'localhost:8080',
    });
  });
});
