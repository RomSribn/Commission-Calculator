# Commission Calculator

A system for calculating commissions for cash in / cash out operations with dynamic configuration retrieval.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

```bash
npm ci
```

## Running the Application

The application processes a JSON file containing transactions and calculates the commission fee for each transaction.

```bash
node src/index.js <path-to-json-file>
```

Example:

```bash
node src/index.js src/input.json
```

The application will output the calculated commission fee for each transaction to the console.

## Running Tests

To run all tests:

```bash
npm test
```

## Project Structure

- `src/index.js` - Main entry point
- `src/config.js` - Configuration retrieval
- `src/calculators/` - Commission calculation logic
  - `commission-calculator.js` - Main calculator that delegates to specific calculators
  - `cash-in-calculator.js` - Calculator for cash in operations
  - `cash-out-natural-calculator.js` - Calculator for cash out operations by natural persons
  - `cash-out-juridical-calculator.js` - Calculator for cash out operations by juridical persons
- `src/utils/` - Utility functions
  - `date-utils.js` - Date manipulation utilities
  - `rounding.js` - Currency rounding utilities
  - `types.js` - Type definitions

## Type Documentation

This project uses JSDoc for type checking. For detailed information about the types used in this project, see [TYPES.md](TYPES.md).

## Input Format

The input file should be a JSON array of transaction objects. Each transaction object should have the following format:

```json
{
  "date": "YYYY-MM-DD",
  "user_id": 123,
  "user_type": "natural",
  "type": "cash_in",
  "operation": {
    "amount": 100.00,
    "currency": "EUR"
  }
}
```

## Output Format

The application outputs the calculated commission fee for each transaction, rounded up to the nearest cent (0.01).
