/**
 * @enum {string}
 */
const USER_TYPE = {
  /** Natural person */
  NATURAL: 'natural',
  /** Juridical person (company) */
  JURIDICAL: 'juridical',
};

/**
 * @enum {string}
 */
const TRANSACTION_TYPE = {
  /** Cash in transaction */
  CASH_IN: 'cash_in',
  /** Cash out transaction */
  CASH_OUT: 'cash_out',
};

/**
 * @typedef {Object} Operation
 * @property {number} amount - The transaction amount
 * @property {string} currency - The currency code
 */

/**
 * @typedef {Object} Transaction
 * @property {string} date - The transaction date
 * @property {number} user_id - The user identifier
 * @property {string} user_type - The type of user (USER_TYPE.NATURAL or USER_TYPE.JURIDICAL)
 * @property {string} type - The type of transaction (TRANSACTION_TYPE.CASH_IN or
 *                          TRANSACTION_TYPE.CASH_OUT)
 * @property {Operation} operation - The operation details
 */

/**
 * @typedef {Object} MoneyAmount
 * @property {number} amount - The amount value
 * @property {string} currency - The currency code
 */

/**
 * @typedef {Object} CashInConfig
 * @property {number} percents - The percentage for fee calculation
 * @property {MoneyAmount} max - The maximum fee amount
 */

/**
 * @typedef {Object} CashOutNaturalConfig
 * @property {number} percents - The percentage for fee calculation
 * @property {MoneyAmount} week_limit - The weekly limit for free cash out
 */

/**
 * @typedef {Object} CashOutJuridicalConfig
 * @property {number} percents - The percentage for fee calculation
 * @property {MoneyAmount} min - The minimum fee amount
 */

/**
 * @typedef {Object} Configs
 * @property {CashInConfig} cashInConfig - Configuration for cash in transactions
 * @property {CashOutNaturalConfig} cashOutNaturalConfig - Configuration for cash out natural
 *                                                         transactions
 * @property {CashOutJuridicalConfig} cashOutJuridicalConfig - Configuration for cash out
 *                                                             juridical transactions
 */

export {
  USER_TYPE,
  TRANSACTION_TYPE,
};
