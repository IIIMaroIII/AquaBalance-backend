import { CONTACT_TYPE } from '../constants/constants.js';

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = [CONTACT_TYPE.HOME, CONTACT_TYPE.PERSONAL].includes(
    contactType,
  );
  if (isContactType || contactType) return contactType;
};

const parseIsFavorite = (favoriteQuery) => {
  const isString = typeof favoriteQuery === 'string';
  if (!isString) return;
  const isFavoriteKnown = favoriteQuery === 'false' || favoriteQuery === 'true';
  // const isFavoriteKnown = typeof favoriteQuery === 'boolean';
  if (isFavoriteKnown) return favoriteQuery;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavorite, name, email, phoneNumber } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedName = parseContactType(name);
  const parsedEmail = parseContactType(email);
  const parsedPhoneNumber = parseContactType(phoneNumber);
  const parsedIsFavorite = parseIsFavorite(isFavorite);
  return {
    contactType: parsedContactType,
    isFavorite: parsedIsFavorite,
    name: parsedName,
    email: parsedEmail,
    phoneNumber: parsedPhoneNumber,
  };
};
