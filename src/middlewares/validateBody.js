import { HttpError } from '../utils/HttpError.js';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(HttpError(400, error.message));
  }
};
