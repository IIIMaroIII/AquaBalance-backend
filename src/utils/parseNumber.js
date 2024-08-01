export const parseNumber = (number, defaultValue = 1) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;
  return parsedNumber;
};
