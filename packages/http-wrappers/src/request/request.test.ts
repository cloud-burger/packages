import axios from 'axios';
import { defaultRequest } from '.';

jest.mock('axios');

describe('request', () => {
  const axiosRequestMock = axios.request as jest.MockedFunction<
    typeof axios.request
  >;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute request successfully', async () => {
    axiosRequestMock.mockResolvedValue({
      status: 200,
      data: { test: true },
    });

    const response = await defaultRequest('GET', {
      url: 'localhost:8080',
      timeout: 10,
    });

    expect(response).toEqual({
      status: 200,
      data: { test: true },
    });
    expect(axiosRequestMock).toHaveBeenNthCalledWith(1, {
      httpsAgent: expect.any(Object),
      method: 'GET',
      timeout: 10,
      url: 'localhost:8080',
    });
  });

  it('should throw timeout error', async () => {
    axiosRequestMock.mockRejectedValue({
      code: 'ECONNABORTED',
      message: 'Timeout',
    });

    await expect(
      defaultRequest('GET', { url: 'localhost:8080' }),
    ).rejects.toThrow('Response time exceeded on integration localhost:8080');

    expect(axiosRequestMock).toHaveBeenNthCalledWith(1, {
      httpsAgent: expect.any(Object),
      method: 'GET',
      url: 'localhost:8080',
    });
  });

  it('should throw error', async () => {
    axiosRequestMock.mockRejectedValue({
      code: 'BADREQUEST',
      message: 'Amount is invalid',
      config: {
        url: 'localhost:8080',
        method: 'POST',
      },
      response: {
        status: 400,
      },
    });
    try {
      await defaultRequest('POST', { url: 'localhost:8080' });
    } catch (error) {
      expect(error).toEqual({
        code: 'BADREQUEST',
        message: 'Amount is invalid',
        config: {
          url: 'localhost:8080',
          method: 'POST',
        },
        response: {
          status: 400,
        },
      });
    }
    expect(axiosRequestMock).toHaveBeenNthCalledWith(1, {
      httpsAgent: expect.any(Object),
      method: 'POST',
      url: 'localhost:8080',
    });
  });
});
