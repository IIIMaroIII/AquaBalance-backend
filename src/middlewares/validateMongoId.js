import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';

export const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      return next(HttpError(400, `The id ${id} was not provided!`));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(HttpError(400, `The ${id} has not validated!`));
    }
    return next();
  };
