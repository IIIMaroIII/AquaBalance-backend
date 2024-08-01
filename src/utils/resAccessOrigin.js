import { ALLOWED_ORIGINS } from '../constants/constants.js';
import { HttpError } from './HttpError.js';

export const resAccessOriginHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  } else {
    return HttpError(500, 'CORS error');
  }
};
