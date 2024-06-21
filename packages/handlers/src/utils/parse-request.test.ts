import { createRequest } from 'node-mocks-http';
import { parseRequest } from './parse-request';

describe('Parse request', () => {
  it('should parse request', () => {
    const req = createRequest({
      url: 'http://test.com',
      params: {
        id: '323',
      },
      query: {
        name: 'John',
      },
      body: {
        age: 1,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      baseUrl: '/api',
      ip: '0.0.0',
      method: 'GET',
      originalUrl: '/api/v1',
      path: '/v1',
    });

    expect(parseRequest(req)).toEqual({
      body: { age: 1 },
      headers: { 'content-type': 'application/json' },
      host: '',
      id: expect.any(String),
      ip: '0.0.0',
      method: 'GET',
      originalUrl: '/api/v1',
      params: { id: '323', name: 'John' },
      path: '/v1',
      pathParameters: { id: '323' },
      query: { name: 'John' },
      url: '/api',
    });
  });
});
