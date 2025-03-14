/**
 * Rounds a number up to the nearest hundredth (e.g., for EUR currency – to cents).
 *
 * @param {*} fee - The number to round up.
 * @example
 * const fee = 0.023;
 * const roundedFee = roundUp(fee); // Output: 0.03
 */
function roundUp(fee) {
  return (Math.ceil(fee * 100) / 100).toFixed(2);
}

export default roundUp;
