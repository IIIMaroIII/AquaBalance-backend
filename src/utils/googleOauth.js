import { GOOGLE_OAUTH } from '../constants/constants.js';
import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { HttpError } from './HttpError.js';

const googleOauthClient = new OAuth2Client({
  clientId: env(GOOGLE_OAUTH.CLIENT_ID),
  clientSecret: env(GOOGLE_OAUTH.CLIENT_SECRET),
  redirectUri: GOOGLE_OAUTH.REDIRECT_URIS,
});

const generateAuthUrl = () =>
  googleOauthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

const validateCode = async (code) => {
  const response = await googleOauthClient.getToken(code);

  if (!response.tokens.id_token) throw HttpError(401, 'Unauthorized');

  const ticket = await googleOauthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';

  if (payload.given_name && payload.family_name) {
    return (fullName = `${payload.given_name} ${payload.family_name}`);
  }

  fullName = payload.given_name;
  return fullName;
};

export const googleOauth = {
  generateAuthUrl,
  validateCode,
  getFullNameFromGoogleTokenPayload,
};
