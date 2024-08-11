import {
  CLOUDINARY,
  COOKIE,
  // USER
} from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../utils/env.js';
import { googleOauth } from '../utils/googleOauth.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

const getAllUsersController = async (req, res, next) => {
  const amount = await Services.users.getAllUsers();

  if (!amount)
    return next(
      HttpError(
        500,
        'Some error has occurred after retrieving a data from MongoDB',
      ),
    );

  res.status(200).json({
    status: 200,
    message: `The number of users has been successfully found`,
    data: { totalUsers: amount },
  });
};

const getUserInfoController = async (req, res, next) => {
  const user = req.user;

  if (!user) return next(HttpError(401, 'Unauthorized'));

  res.status(200).json({
    status: 200,
    message: 'User info was successfully found',
    user,
  });
};

const RegisterController = async (req, res, next) => {
  const user = await Services.users.registerUser(req.body);
  if (!user) return next(HttpError(500, 'Internal Server Error'));

  res.json(ResponseMaker(201, 'Successfully registered a user!', user));
};

const LoginController = async (req, res, next) => {
  const session = await Services.users.loginUser(req.body);
  if (!session) return next(HttpError(500, 'Internal Server Error'));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'You`ve been successfully logged in!', {
      email: req.body.email,
      accessToken: session.accessToken,
    }),
  );
};

const RefreshController = async (req, res, next) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    return next(HttpError(401, 'Missing session cookies'));
  }

  const session = await Services.users.refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) return next(HttpError(500, 'Internal Server Error', session));

  GenerateCookie(session, res);

  res.json(
    ResponseMaker(200, 'The session has been successfully refreshed!', {
      accessToken: session.accessToken,
    }),
  );
};

const UpdateController = async (req, res, next) => {
  const { file, body } = req;

  let avatar;

  if (file) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      avatar = await saveFileToCloudinary(file);
    } else {
      avatar = await saveFileToUploadDir(file);
    }
  }

  const result = await Services.users.updateUser(
    { _id: req.user.id },
    {
      ...body,
      photoUrl: avatar,
    },
  );

  if (!result) {
    return next(HttpError(404, `The user was not found!`));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated a user!`,
    data: result,
  });
};

const LogoutController = async (req, res, next) => {
  const { sessionId, refreshToken } = req.cookies;
  console.log('sessionId', sessionId);
  console.log('refreshToken', refreshToken);

  if (!sessionId || !refreshToken) {
    return next(HttpError(401, 'Missing session cookies'));
  }

  await Services.users.logoutUser({
    sessionId: sessionId,
    refreshToken: refreshToken,
  });
  res.clearCookie(COOKIE.SESSION_ID);
  res.clearCookie(COOKIE.REFRESH_TOKEN);
  res.status(204).send();
};

const RequestResetPasswordController = async (req, res) => {
  await Services.users.requestResetPassword(req.body.email);
  res.json(
    ResponseMaker(
      200,
      'The reset password email has been successfully sent!',
      {},
    ),
  );
};

const ResetPwdController = async (req, res) => {
  await Services.users.resetPwd(req.body);
  res.json(ResponseMaker(200, 'The password has been successfully reset!', {}));
};

const getGoogleAuthUrlController = async (req, res) => {
  const url = googleOauth.generateAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

const loginWithGoogleController = async (req, res, next) => {
  const session = await Services.users.loginOrSignupWithGoogle(req.body.code);
  if (!session) return next(HttpError(500, 'Internal Server Error'));
  GenerateCookie(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const users = {
  getAllUsersController,
  getUserInfoController,
  RegisterController,
  LoginController,
  RefreshController,
  LogoutController,
  RequestResetPasswordController,
  ResetPwdController,
  getGoogleAuthUrlController,
  loginWithGoogleController,
  UpdateController,
};
