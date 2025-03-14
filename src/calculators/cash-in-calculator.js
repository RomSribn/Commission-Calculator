import { roundUp } from '#utils';
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */
/** @typedef {import('#utils/types').CashInConfig} CashInConfig */

class CashInCalculator {
  /**
   * Constructor accepts configuration for cash in
   * @param {CashInConfig} config - Configuration for cash in transactions
   * @example
   * { percents: 0.03, max: { amount: 5, currency: 'EUR' } }
   */
  constructor(config) {
    /** @type {CashInConfig} */
    this.config = config;
  }

  /**
   * Calculate fee for a cash in transaction
   * @param {Transaction} transaction - The transaction data
   * @returns {number} The calculated fee amount
   */
  calculateFee(transaction) {
    const { amount } = transaction.operation;
    // Calculate the fee: amount * (percents / 100)
    let fee = amount * (this.config.percents / 100);
    if (fee > this.config.max.amount) {
      fee = this.config.max.amount;
    }
    return roundUp(fee);
  }
}

export default CashInCalculator;
