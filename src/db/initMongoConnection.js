import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/constants.js';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = ENV_VARS;
  const connectionLink = `mongodb+srv://${env(MONGODB_USER)}:${env(
    MONGODB_PASSWORD,
  )}@${env(MONGODB_URL)}/${env(
    MONGODB_DB,
  )}?retryWrites=true&w=majority&appName=Cluster1`;
  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    throw new Error(error.message);
  }
};
