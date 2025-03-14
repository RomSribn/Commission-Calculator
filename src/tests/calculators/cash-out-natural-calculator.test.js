import CashOutNaturalCalculator from '#calculators/cash-out-natural-calculator';

describe('CashOutNaturalCalculator', () => {
  const config = {
    percents: 0.3,
    week_limit: { amount: 1000, currency: 'EUR' }
  };

  let calculator;

  beforeEach(() => {
    calculator = new CashOutNaturalCalculator(config);
  });

  test('should applies free weekly limit for first transaction', () => {
    const transaction = {
      date: '2023-01-02', // Monday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 500.00, currency: 'EUR' }
    };

    // Expected fee: 0 EUR (under weekly limit)
    expect(calculator.calculateFee(transaction)).toBe('0.00');
  });

  test('should applies free weekly limit for multiple transactions within limit', () => {
    const transaction1 = {
      date: '2023-01-02', // Monday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 400.00, currency: 'EUR' }
    };

    const transaction2 = {
      date: '2023-01-03', // Tuesday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 500.00, currency: 'EUR' }
    };

    // Both transactions should be free (total 900 EUR, under 1000 EUR limit)
    expect(calculator.calculateFee(transaction1)).toBe('0.00');
    expect(calculator.calculateFee(transaction2)).toBe('0.00');
  });

  test('should charges fee for amount exceeding weekly limit in a single transaction', () => {
    const transaction = {
      date: '2023-01-02', // Monday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1500.00, currency: 'EUR' }
    };

    // Expected fee: (1500 - 1000) * 0.3% = 1.5 EUR
    expect(calculator.calculateFee(transaction)).toBe('1.50');
  });

  test('should charges fee for amount exceeding weekly limit across multiple transactions', () => {
    // Reset calculator to ensure clean state
    calculator = new CashOutNaturalCalculator(config);

    const transaction1 = {
      date: '2023-01-02', // Monday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 800.00, currency: 'EUR' }
    };

    const transaction2 = {
      date: '2023-01-03', // Tuesday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 300.00, currency: 'EUR' }
    };

    // First transaction: free (under limit)
    expect(calculator.calculateFee(transaction1)).toBe('0.00');
    
    // Second transaction: (800 + 300 - 1000) * 0.3% = 0.3 EUR
    expect(calculator.calculateFee(transaction2)).toBe('0.30');
  });

  test('should resets weekly limit for new week', () => {
    // Reset calculator to ensure clean state
    calculator = new CashOutNaturalCalculator(config);

    const transaction1 = {
      date: '2023-01-02', // Monday of week 1
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    const transaction2 = {
      date: '2023-01-09', // Monday of week 2
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    // Both transactions should be free (each within their respective week's limit)
    expect(calculator.calculateFee(transaction1)).toBe('0.00');
    expect(calculator.calculateFee(transaction2)).toBe('0.00');
  });

  test('should handles different users independently', () => {
    // Reset calculator to ensure clean state
    calculator = new CashOutNaturalCalculator(config);

    const transaction1 = {
      date: '2023-01-02', // Monday
      user_id: 1,
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    const transaction2 = {
      date: '2023-01-02', // Same day
      user_id: 2, // Different user
      user_type: 'natural',
      type: 'cash_out',
      operation: { amount: 1000.00, currency: 'EUR' }
    };

    // Both transactions should be free (each user has their own limit)
    expect(calculator.calculateFee(transaction1)).toBe('0.00');
    expect(calculator.calculateFee(transaction2)).toBe('0.00');
  });
});
