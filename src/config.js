// Import for JSDoc type reference only
/** @typedef {import('#utils/types').Configs} Configs */
/** @typedef {import('#utils/types').CashInConfig} CashInConfig */
/** @typedef {import('#utils/types').CashOutNaturalConfig} CashOutNaturalConfig */
/** @typedef {import('#utils/types').CashOutJuridicalConfig} CashOutJuridicalConfig */

/**
 * Get configurations from the API for calculating commissions.
 * The following URLs are used:
 *   - Cash In: https://developers.paysera.com/tasks/api/cash-in
 *   - Cash Out Natural: https://developers.paysera.com/tasks/api/cash-out-natural
 *   - Cash Out Juridical: https://developers.paysera.com/tasks/api/cash-out-juridical
 * @returns {Promise<Configs>} The configuration objects for all transaction types
 */
async function getConfigurations() {
  const cashInUrl = 'https://developers.paysera.com/tasks/api/cash-in';
  const cashOutNaturalUrl = 'https://developers.paysera.com/tasks/api/cash-out-natural';
  const cashOutJuridicalUrl = 'https://developers.paysera.com/tasks/api/cash-out-juridical';

  try {
    const [cashInRes, cashOutNaturalRes, cashOutJuridicalRes] = await Promise.all([
      fetch(cashInUrl),
      fetch(cashOutNaturalUrl),
      fetch(cashOutJuridicalUrl),
    ]);

    if (!cashInRes.ok || !cashOutNaturalRes.ok || !cashOutJuridicalRes.ok) {
      throw new Error('Error fetching configurations from the API');
    }

    /** @type {CashInConfig} */
    const cashInConfig = await cashInRes.json();
    /** @type {CashOutNaturalConfig} */
    const cashOutNaturalConfig = await cashOutNaturalRes.json();
    /** @type {CashOutJuridicalConfig} */
    const cashOutJuridicalConfig = await cashOutJuridicalRes.json();

    return {
      cashInConfig,
      cashOutNaturalConfig,
      cashOutJuridicalConfig,
    };
  } catch (err) {
    throw new Error(`Error fetching configurations: ${err.message}`);
  }
}

export default getConfigurations;
