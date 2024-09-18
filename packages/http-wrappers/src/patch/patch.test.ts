import { defaultRequest } from '../request';
import { AxiosResponse } from '../types/response';
import { patch } from './index';
jest.mock('../request');

describe('patch', () => {
  const defaultRequestMock = defaultRequest as jest.MockedFunction<
    typeof defaultRequest
  >;

  it('should patch successfully', async () => {
    defaultRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    } as AxiosResponse);

    const response = await patch({
      url: 'localhost:8080',
    });

    expect(response).toEqual({ data: { test: true }, status: 200 });
    expect(defaultRequestMock).toHaveBeenNthCalledWith(1, 'PATCH', {
      url: 'localhost:8080',
    });
  });
});
