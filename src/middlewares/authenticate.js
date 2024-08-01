import { AUTHENTICATE } from '../constants/constants.js';
import { Models } from '../db/models/index.js';

import { HttpError } from '../utils/HttpError.js';

export const authenticate = async (req, res, next) => {
  const authorizationHeader = req.get(AUTHENTICATE.AUTHORIZATION);
  if (!authorizationHeader) {
    return next(HttpError(401, 'Please provide the Authorization header'));
  }

  const [bearer, token] = authorizationHeader.split(' ');
  if (bearer !== AUTHENTICATE.BEARER || !token) {
    return next(
      HttpError(401, 'Authorization header is supposted to be of type Bearer!'),
    );
  }

  const session = await Models.SessionModel.findOne({ accessToken: token });
  if (!session) {
    return next(HttpError(401, 'The session was not found!'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    return next(HttpError(401, 'The access token has been expired!'));
  }

  const user = await Models.UserModel.findById(session.userId);
  if (!user) {
    return next(
      HttpError(401, 'The user associated with this session was not found!'),
    );
  }

  req.user = user;
  next();
};
