export const getStartAndEndOfDay = (dateString) => {
  const date = new Date(dateString);

  const timezoneOffset = date.getTimezoneOffset();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0 - timezoneOffset, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59 - timezoneOffset, 59, 999);

  const start =
    startOfDay.toISOString().split('T')[0] +
    'T00:00:00' +
    formatTimezoneOffset(timezoneOffset);
  const end =
    endOfDay.toISOString().split('T')[0] +
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
