# JavaScript Typing with JSDoc

This project implements JavaScript code typing using JSDoc without the need for TypeScript.

## Data Types

All data types are defined in the `src/utils/types.js` file. The main types include:

### Transaction

```javascript
/**
 * @typedef {Object} Transaction
 * @property {string} date - The transaction date
 * @property {number} user_id - The user identifier
 * @property {string} user_type - The user type (USER_TYPE.NATURAL or USER_TYPE.JURIDICAL)
 * @property {string} type - The transaction type (TRANSACTION_TYPE.CASH_IN or TRANSACTION_TYPE.CASH_OUT)
 * @property {Operation} operation - The operation details
 */
```

### Operation

```javascript
/**
 * @typedef {Object} Operation
 * @property {number} amount - The transaction amount
 * @property {string} currency - The currency code
 */
```

## Enum Constants

The `src/utils/types.js` file defines enum constants for user types and transaction types:

```javascript
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
```

## How to Use Types

To use types in your code, add JSDoc comments:

```javascript
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */

/**
 * Function to process a transaction
 * @param {Transaction} transaction - The transaction data
 * @returns {number} The calculated commission
 */
function processTransaction(transaction) {
  // Your code here
}
```

## How to Use Enum Constants

Use constants instead of string literals:

```javascript
// Import constants
import { USER_TYPE, TRANSACTION_TYPE } from '#utils/types';

// Create a transaction using constants
const transaction = {
  date: '2023-03-14',
  user_id: 123,
  user_type: USER_TYPE.NATURAL,  // Instead of 'natural'
  type: TRANSACTION_TYPE.CASH_OUT,  // Instead of 'cash_out'
  operation: {
    amount: 500.00,
    currency: 'EUR',
  },
};

// Use in conditions
if (transaction.type === TRANSACTION_TYPE.CASH_IN) {
  // Process cash in
} else if (transaction.type === TRANSACTION_TYPE.CASH_OUT) {
  // Process cash out
}
```

## Advantages of This Approach

1. **Protection from typos**: Using constants instead of string literals prevents errors like `'nautral'` instead of `'natural'`.

2. **Better auto-completion**: IDEs will suggest available enum values when typing `USER_TYPE.` or `TRANSACTION_TYPE.`.

3. **Simplified refactoring**: If you need to change enum values, you update them in only one place.

4. **Self-documenting code**: Using constants makes the code more readable and understandable.

5. **Validation**: You can easily check that a value is one of the allowed enum values.
