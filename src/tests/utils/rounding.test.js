import roundUp from '#utils/rounding';

describe('roundUp function', () => {
  test('should rounds up to the nearest cent', () => {
    expect(roundUp(0.023)).toBe('0.03');
    expect(roundUp(0.025)).toBe('0.03');
    expect(roundUp(0.03)).toBe('0.03');
    expect(roundUp(0.031)).toBe('0.04');
    expect(roundUp(1.999)).toBe('2.00');
    expect(roundUp(0)).toBe('0.00');
  });

  test('should handles larger numbers', () => {
    expect(roundUp(123.456)).toBe('123.46');
    expect(roundUp(9999.991)).toBe('10000.00');
  });

  test('should handles string inputs by converting them to numbers', () => {
    expect(roundUp('0.023')).toBe('0.03');
    expect(roundUp('1.999')).toBe('2.00');
  });
});
