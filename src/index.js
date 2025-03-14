/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import CommissionCalculator from '#calculators/commission-calculator';
import getConfigurations from '#config';
// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Transaction} Transaction */

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Please provide a path to the data file.');
    process.exit(1);
  }

  /** @type {Transaction[]} */
  let transactions;
  try {
    transactions = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
  } catch (err) {
    console.error(`Error reading or parsing the file: ${err.message}`);
    process.exit(1);
  }

  let configs;
  try {
    configs = await getConfigurations();
  } catch (err) {
    console.error('Error fetching configurations:', err.message);
    process.exit(1);
  }

  const calculator = new CommissionCalculator(configs);

  transactions.forEach((transaction) => {
    try {
      const fee = calculator.calculate(transaction);
      console.log(fee);
    } catch (err) {
      console.error('Error calculating the fee:', err.message);
    }
  });
}

main();
