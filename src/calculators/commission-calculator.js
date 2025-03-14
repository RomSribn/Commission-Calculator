// calculators
import CashInCalculator from '#calculators/cash-in-calculator';
import CashOutNaturalCalculator from '#calculators/cash-out-natural-calculator';
import CashOutJuridicalCalculator from '#calculators/cash-out-juridical-calculator';
// utils
import { USER_TYPE, TRANSACTION_TYPE } from '#utils/types';
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */
/** @typedef {import('#utils/types').Configs} Configs */
/** @typedef {import('#utils/types').CashInConfig} CashInConfig */
/** @typedef {import('#utils/types').CashOutNaturalConfig} CashOutNaturalConfig */
/** @typedef {import('#utils/types').CashOutJuridicalConfig} CashOutJuridicalConfig */

class CommissionCalculator {
  /**
   * Constructor accepts configuration object for all transaction types
   * @param {Configs} configs - Configuration for all transaction types
   */
  constructor(configs) {
    const { cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig } = configs;
    this.cashInCalculator = new CashInCalculator(cashInConfig);
    this.cashOutNaturalCalculator = new CashOutNaturalCalculator(cashOutNaturalConfig);
    this.cashOutJuridicalCalculator = new CashOutJuridicalCalculator(cashOutJuridicalConfig);
  }

  /**
   * Calculate commission fee for a transaction
   * @param {Transaction} transaction - The transaction data
   * @returns {number} The calculated fee amount
   */
  calculate(transaction) {
    const { type, user_type: userType } = transaction;

    if (type === TRANSACTION_TYPE.CASH_IN) {
      return this.cashInCalculator.calculateFee(transaction);
    }

    if (type === TRANSACTION_TYPE.CASH_OUT && userType === USER_TYPE.NATURAL) {
      return this.cashOutNaturalCalculator.calculateFee(transaction);
    }

    if (type === TRANSACTION_TYPE.CASH_OUT && userType === USER_TYPE.JURIDICAL) {
      return this.cashOutJuridicalCalculator.calculateFee(transaction);
    }

    throw new Error('Unsupported transaction type or user type');
  }
}

export default CommissionCalculator;
