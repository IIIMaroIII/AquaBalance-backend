import { endOfDay } from 'date-fns';

export const endOfDayUtc = (date) => {
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return endOfDay(utcDate);
};
