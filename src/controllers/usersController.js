import {
  CLOUDINARY,
  COOKIE,
  // USER
} from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../utils/env.js';
// import { googleOauth } from '../utils/googleOauth.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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
  const { gender, name, email, weight, activeTime } = body;

  let avatar;
  let dailyNorma;

  // dailyNorma = calculateDailyWaterIntake(
  //   gender,
  //   Number(weight),
  //   Number(activeTime),
  // );

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
      gender,
      name,
      email,
      weight,
      timeInSports: activeTime,
      dailyNorma,
      photoUrl: avatar,
    },
  );

  if (!result) {
    return next(
      HttpError(404, `The contact with ${req.user._id} was not found!`),
    );
  }

  res.json(
    ResponseMaker(
      200,
      `Successfully updated a contact by id ${req.user._id}}!`,
      result,
    ),
  );
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

// const getGoogleAuthUrlController = async (req, res) => {};

// const loginWithGoogleController = async (req, res) => {};

export const users = {
  RegisterController,
  LoginController,
  RefreshController,
  LogoutController,
  RequestResetPasswordController,
  ResetPwdController,
  // getGoogleAuthUrlController,
  // loginWithGoogleController,
  UpdateController,
};
