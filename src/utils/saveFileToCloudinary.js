import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/constants.js';
import { env } from './env.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const res = await cloudinary.v2.uploader.upload(file.path);
  return res.secure_url;
};
