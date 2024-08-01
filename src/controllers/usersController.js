import { CLOUDINARY, COOKIE, USER } from '../constants/constants.js';
import { Services } from '../services/index.js';
import { GenerateCookie } from '../utils/GenerateCookie.js';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../utils/env.js';
import { googleOauth } from '../utils/googleOauth.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

const RegisterController = async (req, res, next) => {
  // if (!user) return next(HttpError(500, 'Internal Server Error'));
};

const LoginController = async (req, res, next) => {
  // if (!session) return next(HttpError(500, 'Internal Server Error'));
  // GenerateCookie(session, res);
};

const RefreshController = async (req, res, next) => {
  // if (!sessionId || !refreshToken) {
  //   return next(HttpError(401, 'Missing session cookies'));
  // }
  // if (!session) return next(HttpError(500, 'Internal Server Error', session));
  // GenerateCookie(session, res);
};

const UpdateController = async (req, res, next) => {};

const LogoutController = async (req, res, next) => {
  // if (!sessionId || !refreshToken) {
  //   return next(HttpError(401, 'Missing session cookies'));
  // }
};

const RequestResetPasswordController = async (req, res) => {};

const ResetPwdController = async (req, res) => {};

const getGoogleAuthUrlController = async (req, res) => {};

const loginWithGoogleController = async (req, res) => {};

export const users = {
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
