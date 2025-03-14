import { roundUp } from '#utils';
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */
/** @typedef {import('#utils/types').CashOutJuridicalConfig} CashOutJuridicalConfig */

class CashOutJuridicalCalculator {
  /**
   * Constructor accepts configuration for cash out juridical
   * @param {CashOutJuridicalConfig} config - Configuration for cash out juridical transactions
   * @example
   * { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } }
   */
  constructor(config) {
    /** @type {CashOutJuridicalConfig} */
    this.config = config;
  }

  /**
   * Calculate fee for a cash out transaction by a juridical person
   * @param {Transaction} transaction - The transaction data
   * @returns {number} The calculated fee amount
   */
  calculateFee(transaction) {
    const { amount } = transaction.operation;
    let fee = amount * (this.config.percents / 100);
    if (fee < this.config.min.amount) {
      fee = this.config.min.amount;
    }
    return roundUp(fee);
  }
}

export default CashOutJuridicalCalculator;
