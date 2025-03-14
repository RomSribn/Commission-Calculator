import CommissionCalculator from '#calculators/commission-calculator';
import { USER_TYPE, TRANSACTION_TYPE } from '#utils/types';

describe('CommissionCalculator', () => {
  const configs = {
    cashInConfig: {
      percents: 0.03,
      max: { amount: 5, currency: 'EUR' },
    },
    cashOutNaturalConfig: {
      percents: 0.3,
      week_limit: { amount: 1000, currency: 'EUR' },
    },
    cashOutJuridicalConfig: {
      percents: 0.3,
      min: { amount: 0.5, currency: 'EUR' },
    },
  };

  let calculator;

  beforeEach(() => {
    calculator = new CommissionCalculator(configs);
  });

  test('should delegates cash in transactions to CashInCalculator', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: USER_TYPE.NATURAL,
      type: TRANSACTION_TYPE.CASH_IN,
      operation: { amount: 1000.00, currency: 'EUR' },
    };

    // Expected fee: 1000 * 0.03% = 0.3 EUR
    expect(calculator.calculate(transaction)).toBe('0.30');
  });

  test('should delegates cash out natural transactions to CashOutNaturalCalculator', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: USER_TYPE.NATURAL,
      type: TRANSACTION_TYPE.CASH_OUT,
      operation: { amount: 1500.00, currency: 'EUR' },
    };

    // Expected fee: (1500 - 1000) * 0.3% = 1.5 EUR
    expect(calculator.calculate(transaction)).toBe('1.50');
  });

  test('should delegates cash out juridical transactions to CashOutJuridicalCalculator', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 2,
      user_type: USER_TYPE.JURIDICAL,
      type: TRANSACTION_TYPE.CASH_OUT,
      operation: { amount: 1000.00, currency: 'EUR' },
    };

    // Expected fee: 1000 * 0.3% = 3 EUR
    expect(calculator.calculate(transaction)).toBe('3.00');
  });

  test('should throws error for unsupported transaction type', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: USER_TYPE.NATURAL,
      type: 'invalid_type',
      operation: { amount: 1000.00, currency: 'EUR' },
    };

    expect(() => calculator.calculate(transaction)).toThrow('Unsupported transaction type or user type');
  });

  test('should throws error for unsupported user type', () => {
    const transaction = {
      date: '2023-01-01',
      user_id: 1,
      user_type: 'invalid_user_type',
      type: TRANSACTION_TYPE.CASH_OUT,
      operation: { amount: 1000.00, currency: 'EUR' },
    };

    expect(() => calculator.calculate(transaction)).toThrow('Unsupported transaction type or user type');
  });
});
