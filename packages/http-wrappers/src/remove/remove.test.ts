import { defaultRequest } from '../request';
import { AxiosResponse } from '../types/response';
import { remove } from './index';
jest.mock('../request');

describe('remove', () => {
  const defaultRequestMock = defaultRequest as jest.MockedFunction<
    typeof defaultRequest
  >;

  it('should delete successfully', async () => {
    defaultRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    } as AxiosResponse);

    const response = await remove({
      url: 'localhost:8080',
    });

    expect(response).toEqual({ data: { test: true }, status: 200 });
    expect(defaultRequestMock).toHaveBeenNthCalledWith(1, 'DELETE', {
      url: 'localhost:8080',
    });
  });
});
