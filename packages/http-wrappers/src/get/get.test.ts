import { defaultRequest } from '../request';
import { AxiosResponse } from '../types/response';
import { get } from './index';
jest.mock('../request');

describe('get', () => {
  const defaultRequestMock = defaultRequest as jest.MockedFunction<
    typeof defaultRequest
  >;

  it('should get successfully', async () => {
    defaultRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    } as AxiosResponse);

    const response = await get({
      url: 'localhost:8080',
    });

    expect(response).toEqual({ data: { test: true }, status: 200 });
    expect(defaultRequestMock).toHaveBeenNthCalledWith(1, 'GET', {
      url: 'localhost:8080',
    });
  });
});
