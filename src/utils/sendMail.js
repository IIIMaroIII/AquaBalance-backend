import nodemailer from 'nodemailer';
import { env } from './env.js';
import { SMTP } from '../constants/constants.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.HOST),
  port: Number(env(SMTP.PORT)),
  auth: {
    user: env(SMTP.USER),
    pass: env(SMTP.PASSWORD),
  },
});

export const sendEmail = async (opt) => await transporter.sendMail(opt);
