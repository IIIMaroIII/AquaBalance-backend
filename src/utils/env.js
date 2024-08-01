import dotenv from 'dotenv';

dotenv.config();

export const env = (envName, envDefaultValue = 3000) => {
  return process?.env[envName] || envDefaultValue;
};
