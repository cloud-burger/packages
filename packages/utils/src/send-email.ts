import nodemailer from 'nodemailer';

export interface EmailRequest {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}

const sendEmail = async (request: EmailRequest) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_TOKEN,
    },
  });

  await transporter.sendMail(request);
};

export default sendEmail;
