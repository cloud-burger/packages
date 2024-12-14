import { btoa } from 'buffer';
import { parseBody } from './parse-body';

describe('Parse body', () => {
  it('should return when event is not set', () => {
    expect(parseBody({} as any)).toBeUndefined();
  });

  it('should parse base 64 encoded body', () => {
    expect(
      parseBody({
        body: JSON.stringify(btoa(JSON.stringify({ amount: 10 }))),
        isBase64Encoded: true,
      } as any),
    ).toEqual({ amount: 10 });
  });

  it('should return parsed body', () => {
    expect(
      parseBody({
        body: JSON.stringify({ amount: 10 }),
        isBase64Encoded: false,
      } as any),
    ).toEqual({ amount: 10 });
  });
});
