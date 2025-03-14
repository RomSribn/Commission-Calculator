import { roundUp, getWeekStartEnd } from '#utils';
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */
/** @typedef {import('#utils/types').CashOutNaturalConfig} CashOutNaturalConfig */

class CashOutNaturalCalculator {
  /**
   * Constructor accepts configuration for cash out natural
   * @param {CashOutNaturalConfig} config - Configuration for cash out natural transactions
   * @example
   * { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } }
   */
  constructor(config) {
    /** @type {CashOutNaturalConfig} */
    this.config = config;
    /**
     * Store user transactions by week:
     * @example
     * {
     *   'user1': [
     *     { date: '2016-01-05', amount: 200 },
     *     { date: '2016-01-10', amount: 150 }
     *   ],
     *   'user2': [
     *     { date: '2016-01-05', amount: 200 },
     *     { date: '2016-01-10', amount: 150 }
     *   ]
     * }
     */
    this.userWeeklyTransactions = {};
  }

  /**
   * Calculate fee for a cash out transaction by a natural person
   * @param {Transaction} transaction - The transaction data
   * @returns {number} The calculated fee amount
   */
  calculateFee(transaction) {
    const { date, user_id: userId, operation } = transaction;
    const { amount } = operation;
    const { weekStart, weekEnd } = getWeekStartEnd(date);

    if (!this.userWeeklyTransactions[userId]) {
      this.userWeeklyTransactions[userId] = [];
    }

    // Choose transactions of the current week
    const weeklyTransactions = this.userWeeklyTransactions[userId].filter((tx) => {
      const txDate = new Date(tx.date);
      return txDate >= weekStart && txDate <= weekEnd;
    });

    const totalAmountSoFar = weeklyTransactions.reduce((acc, tx) => acc + tx.amount, 0);
    const newTotal = totalAmountSoFar + amount;

    let taxableAmount = 0;
    if (totalAmountSoFar >= this.config.week_limit.amount) {
      taxableAmount = amount;
    } else if (newTotal > this.config.week_limit.amount) {
      taxableAmount = newTotal - this.config.week_limit.amount;
    }

    // Save the transaction in the history for further calculation
    this.userWeeklyTransactions[userId].push({ date, amount });
    const fee = taxableAmount * (this.config.percents / 100);
    return roundUp(fee);
  }
}

export default CashOutNaturalCalculator;
