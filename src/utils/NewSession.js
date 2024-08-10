import { randomBytes } from 'crypto';
import { TIME_DURATION } from '../constants/constants.js';

export const NewSession = (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(
    Date.now() + TIME_DURATION.FIFTEEN_MIN,
  );
  const refreshTokenValidUntil = new Date(
    Date.now() + TIME_DURATION.THIRTY_DAYS,
  );

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
