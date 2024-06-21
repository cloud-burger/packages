import { IncomingHttpHeaders } from 'http';

export const lowerCaseHeaders = (
  headers: IncomingHttpHeaders,
): Record<string, string> => {
  return Object.entries(headers).reduce((headers, [key, value]) => {
    const lowerCasedKey = key.toLowerCase();
    headers[lowerCasedKey] = Array.isArray(value)
      ? value.join(',')
      : String(value);
    return headers;
  }, {} as Record<string, string>);
};
