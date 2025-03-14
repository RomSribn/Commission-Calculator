import CashOutJuridicalCalculator from '#calculators/cash-out-juridical-calculator';

describe('CashOutJuridicalCalculator', () => {
  const config = {
    percents: 0.3,
    min: { amount: 0.5, currency: 'EUR' }
  };

  let calculator;

  beforeEach(() => {
    calculator = new CashOutJuridicalCalculator(config);
  });

  test('should calculates fee correctly for a regular amount', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    // Expected fee: 1000 * 0.3% = 3 EUR
    expect(calculator.calculateFee(transaction)).toBe('3.00');
  });

  test('should applies minimum fee limit', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 100.00, currency: 'EUR' }
    };

    // Expected fee would be 0.3 EUR, but min is 0.5 EUR
    expect(calculator.calculateFee(transaction)).toBe('0.50');
  });

  test('should rounds up to the nearest cent', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_out',
      operation: { amount: 1234.56, currency: 'EUR' }
    };

    // Expected fee: 1234.56 * 0.3% = 3.70 EUR (rounded up from 3.70368)
    expect(calculator.calculateFee(transaction)).toBe('3.71');
  });
});
