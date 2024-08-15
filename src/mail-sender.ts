import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailSender {
  constructor(private  readonly configService: ConfigService) {}

  async mailTransport(email:string,subject:string,html:string) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_SERVER'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      to: email,
      subject: subject,
      html: html,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject('An error occurred: ' + error);
        } else {
          resolve('Email sent: ' + info.response);
        }
      });
    });
  }

}