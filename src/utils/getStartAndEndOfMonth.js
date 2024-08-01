export const getStartAndEndOfMonth = (dateString) => {
  const date = new Date(dateString);

  const timezoneOffset = date.getTimezoneOffset();

  const startOfMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startOfMonthDate.setMinutes(startOfMonthDate.getMinutes() - timezoneOffset);

  const endOfMonthDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  endOfMonthDate.setMinutes(endOfMonthDate.getMinutes() - timezoneOffset);

  const start =
    startOfMonthDate.toISOString().split('T')[0] +
    'T00:00:00' +
    formatTimezoneOffset(timezoneOffset);
  const end =
    endOfMonthDate.toISOString().split('T')[0] +
    'T23:59:59' +
    formatTimezoneOffset(timezoneOffset);

  return { start, end };
};

const formatTimezoneOffset = (offset) => {
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
};
