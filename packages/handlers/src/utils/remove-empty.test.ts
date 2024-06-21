import { removeEmpty } from './remove-empty';

describe('Remove empty', () => {
  it('should return when data is not an object', () => {
    expect(removeEmpty('')).toEqual('');
  });

  it('should return when data is null', () => {
    expect(removeEmpty(null)).toBeNull();
  });

  it('should perform remove empty keys', () => {
    expect(
      removeEmpty({
        name: 'dani',
        amount: null,
        address: {
          street: '',
          number: undefined,
          city: 'SP',
        },
      }),
    ).toEqual({ address: { city: 'SP' }, name: 'dani' });
  });
});
