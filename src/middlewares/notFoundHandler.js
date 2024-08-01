import { HttpError } from '../utils/HttpError.js';

export const notFoundHandler = (req, res, next) => {
  next(HttpError(404, 'Not found!'));
};
