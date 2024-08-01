import joi from 'joi';

const registerUserSchema = joi.object({});

const loginUserSchema = joi.object({});

const updateUserSchema = joi.object({});

const requestResetPasswordSchema = joi.object({});

const resetPwdSchema = joi.object({});

const loginWithGoogleAuthSchema = joi.object({});

export const auth = {
  registerUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPwdSchema,
  loginWithGoogleAuthSchema,
  updateUserSchema,
};
