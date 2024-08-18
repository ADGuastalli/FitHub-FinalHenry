// import nodemailer from 'nodemailer';
import * as nodemailer from 'nodemailer';

const appEmail = 'fithub.entrenadorpersonalizado@gmail.com';
const appKey = 'ziod dutu yfgk sqkr';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: appEmail,
    pass: appKey,
  },
});
