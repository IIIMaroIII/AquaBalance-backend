import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import { Models } from '../db/models/index.js';
import { HttpError } from '../utils/HttpError.js';
import { NewSession } from '../utils/NewSession.js';
import { env } from '../utils/env.js';
import { ENV_VARS, JWT, SMTP } from '../constants/constants.js';
import { sendEmail } from '../utils/sendMail.js';
import { googleOauth } from '../utils/googleOauth.js';

const registerUser = async (payload) => {
  // if (user) throw HttpError(409, 'Email has had already in use!');
};

const loginUser = async (payload) => {
  // if (!user) throw HttpError(404, 'User was not found!');
  // if (!isPasswordEqual) throw HttpError(401, 'Email or password invalid!');
};

const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  // if (!session) throw HttpError(401, 'The session was not found!', session);
  // if (isTokenExpired)
  //   throw HttpError(401, 'The refresh session token has expired!');
};

const updateUser = async (_id, payload) => {};

const logoutUser = async ({ sessionId, refreshToken }) => {};
const requestResetPassword = async (email) => {
  // if (!user) throw HttpError(404, 'The user hasn`t been found!');
};

const resetPwd = async (payload) => {};

const loginOrSignupWithGoogle = async (code) => {};

export const users = {
  registerUser,
  updateUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
  requestResetPassword,
  resetPwd,
  loginOrSignupWithGoogle,
};
