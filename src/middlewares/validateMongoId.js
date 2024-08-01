import mongoose from 'mongoose';
import { HttpError } from '../utils/HttpError.js';

export const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      throw new Error('Id wasn`t provided to validateMongoId middleware');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(HttpError(404, `The ${id} has not validated!`));
    }
    return next();
  };
