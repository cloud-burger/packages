import { mock } from 'jest-mock-extended';
import nodemailer, { Transporter } from 'nodemailer';
import sendEmail from './send-email';

jest.mock('nodemailer');
describe('Send email', () => {
  const nodemailerMock = jest.mocked(nodemailer);

  it('should send email successfully', async () => {
    process.env.SMTP_USER = 'user';
    process.env.SMTP_TOKEN = 'token';
    const transporterMock = mock<Transporter>();
    nodemailerMock.createTransport.mockReturnValue(transporterMock);
    transporterMock.sendMail.mockResolvedValue(null);

    await sendEmail({
      from: 'test@gmail.com',
      to: 'john@gmail.com',
      subject: 'test',
      text: 'test',
    });

    expect(nodemailerMock.createTransport).toHaveBeenNthCalledWith(1, {
      auth: { pass: 'token', user: 'user' },
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
    });
    expect(transporterMock.sendMail).toHaveBeenNthCalledWith(1, {
      from: 'test@gmail.com',
      subject: 'test',
      text: 'test',
      to: 'john@gmail.com',
    });
  });
});
