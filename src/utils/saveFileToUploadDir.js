import path from 'node:path';
import fs from 'node:fs/promises';
import { DIR, ENV_VARS } from '../constants/constants.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(DIR.TEMP, file.filename),
    path.join(DIR.UPLOAD, file.filename),
  );
  return `${env(ENV_VARS.APP_DOMAIN)}/uploads/${file.filename}`;
};
