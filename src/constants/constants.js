import path from 'node:path';

export const SERVER_DOMAIN = 'https://aquabalance-backend.onrender.com';
export const LOCALHOST = 'http://localhost:5173';
export const DEPLOY_FRONTEND = '';

export const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://aqua-balance-frontend.vercel.app',
  'https://aqua-balance-frontend-git-main-iiimaroiiis-projects.vercel.app',
  'https://aqua-balance-frontend-ox98gif6q-iiimaroiiis-projects.vercel.app',
];

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const USER = {
  DEFAULT_USER_IMAGE:
    'https://img.icons8.com/?size=100&id=8VXh2TzKXNG8&format=png&color=000000',
};

export const DIR = {
  TEMP: path.join(process.cwd(), 'temp'),
  UPLOAD: path.join(process.cwd(), 'uploads'),
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TIME_DURATION = {
  FIFE_MIN: 5 * 60 * 1000,
  FIFTEEN_MIN: 15 * 60 * 1000,
  THIRTY_DAYS: 30 * 24 * 60 * 60 * 1000,
};

export const COOKIE = {
  REFRESH_TOKEN: 'refreshToken',
  SESSION_ID: 'sessionId',
  EXPIRES: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
};

export const AUTHENTICATE = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
};

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const JWT = {
  SECRET: 'JWT_SECRET',
};

export const CLOUDINARY = {
  URL: 'CLOUDINARY_URL',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  NAME: 'CLOUDINARY_NAME',
  ENABLE_CLOUDINARY: 'ENABLE_CLOUDINARY',
};

export const SWAGGER = {
  PATH: path.join(process.cwd(), 'docs', 'swagger.json'),
};

export const GOOGLE_OAUTH = {
  CLIENT_ID: 'GOOGLE_OAUTH_CLIENT_ID',
  CLIENT_SECRET: 'GOOGLE_OAUTH_CLIENT_SECRET',
  PATH_JSON: path.join(process.cwd(), 'google-oauth.json'),
  REDIRECT_URIS: `${DEPLOY_FRONTEND}/confirm-google-redirect`,
};
