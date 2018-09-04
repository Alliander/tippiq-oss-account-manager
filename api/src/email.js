import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import debugLogger from 'debugnyan';

const logger = debugLogger('tippiq:mail');

aws.config.update({ region: process.env.SES_REGION });

const transporter = nodemailer.createTransport({
  SES: new aws.SES(),
});

export default (mail) =>
  transporter.sendMail(mail)
  .then(info => logger.debug({ info }))
  .catch(err => logger.error(err));

/*
{
    from: 'sender@example.com',
    to: 'receiver@example.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
  }
  */
