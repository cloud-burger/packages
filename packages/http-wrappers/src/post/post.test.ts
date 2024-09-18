import { defaultRequest } from '../request';
import { AxiosResponse } from '../types/response';
import { post } from './index';
jest.mock('../request');

describe('post', () => {
  const defaultRequestMock = defaultRequest as jest.MockedFunction<
    typeof defaultRequest
  >;

  it('should post successfully', async () => {
    defaultRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    } as AxiosResponse);

    const response = await post({
      url: 'localhost:8080',
    });

    expect(response).toEqual({ data: { test: true }, status: 200 });
    expect(defaultRequestMock).toHaveBeenNthCalledWith(1, 'POST', {
      url: 'localhost:8080',
    });
  });
});
