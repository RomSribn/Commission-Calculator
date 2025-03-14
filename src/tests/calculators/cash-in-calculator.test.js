import CashInCalculator from '#calculators/cash-in-calculator';

describe('CashInCalculator', () => {
  const config = {
    percents: 0.03,
    max: { amount: 5, currency: 'EUR' }
  };

  let calculator;

  beforeEach(() => {
    calculator = new CashInCalculator(config);
  });

  test('should calculates fee correctly for a regular amount', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    // Expected fee: 1000 * 0.03% = 0.3 EUR
    expect(calculator.calculateFee(transaction)).toBe('0.30');
  });

  test('should applies maximum fee limit', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: { amount: 100000.00, currency: 'EUR' }
    };

    // Expected fee would be 30 EUR, but max is 5 EUR
    expect(calculator.calculateFee(transaction)).toBe('5.00');
  });

  test('should rounds up to the nearest cent', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: 'natural',
      type: 'cash_in',
      operation: { amount: 1234.56, currency: 'EUR' }
    };

    // Expected fee: 1234.56 * 0.03% = 0.37068 EUR, rounded up to 0.38 EUR
    expect(calculator.calculateFee(transaction)).toBe('0.38');
  });
});
