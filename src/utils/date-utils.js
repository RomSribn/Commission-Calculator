/**
 * Determines the start (Monday) and end (Sunday) of the week for the given date.
 * The date is passed in the format "YYYY-MM-DD".
 * @param {string} dateStr - Date in the format "YYYY-MM-DD".
 * @returns {Object}
 *    - weekStart: Date object representing the Monday of the week with time set to 00:00:00.000.
 *    - weekEnd: Date object representing the Sunday of the week with time set to 23:59:59.999.
 */
function getWeekStartEnd(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay();

  // In JS, Sunday is 0, so we replace it with 7 to calculate Monday
  const dayAdjusted = day === 0 ? 7 : day;
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayAdjusted - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { weekStart: monday, weekEnd: sunday };
}

export default getWeekStartEnd;
