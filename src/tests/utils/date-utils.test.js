import getWeekStartEnd from '#utils/date-utils';

describe('getWeekStartEnd function', () => {
  test('should returns correct week start and end for a Monday', () => {
    const { weekStart, weekEnd } = getWeekStartEnd('2023-01-02'); // Monday

    expect(weekStart.toISOString()).toBe('2023-01-01T23:00:00.000Z');
    expect(weekEnd.toISOString()).toBe('2023-01-08T22:59:59.999Z');
  });

  test('should returns correct week start and end for a Wednesday', () => {
    const { weekStart, weekEnd } = getWeekStartEnd('2023-01-04'); // Wednesday

    expect(weekStart.toISOString()).toBe('2023-01-01T23:00:00.000Z');
    expect(weekEnd.toISOString()).toBe('2023-01-08T22:59:59.999Z');
  });

  test('should returns correct week start and end for a Sunday', () => {
    const { weekStart, weekEnd } = getWeekStartEnd('2023-01-08'); // Sunday

    expect(weekStart.toISOString()).toBe('2023-01-01T23:00:00.000Z');
    expect(weekEnd.toISOString()).toBe('2023-01-08T22:59:59.999Z');
  });

  test('should handles week spanning across months', () => {
    const { weekStart, weekEnd } = getWeekStartEnd('2023-01-31'); // Tuesday

    expect(weekStart.toISOString()).toBe('2023-01-29T23:00:00.000Z');
    expect(weekEnd.toISOString()).toBe('2023-02-05T22:59:59.999Z');
  });

  test('should handles week spanning across years', () => {
    const { weekStart, weekEnd } = getWeekStartEnd('2022-12-31'); // Saturday

    expect(weekStart.toISOString()).toBe('2022-12-25T23:00:00.000Z');
    expect(weekEnd.toISOString()).toBe('2023-01-01T22:59:59.999Z');
  });
});
