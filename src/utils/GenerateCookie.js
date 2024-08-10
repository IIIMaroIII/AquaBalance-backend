import { COOKIE, TIME_DURATION } from '../constants/constants.js';

export const GenerateCookie = (session, res) => {
  res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
    secure: true,
  });

  res.cookie(COOKIE.SESSION_ID, session._id, {
    httpOnly: true,
    sameSite: 'None',
    expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
    secure: true,
  });
};
