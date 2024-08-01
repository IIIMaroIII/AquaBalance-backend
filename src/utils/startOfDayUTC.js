import { startOfDay } from 'date-fns';

export const startOfDayUtc = (date) => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return startOfDay(utcDate);
};
