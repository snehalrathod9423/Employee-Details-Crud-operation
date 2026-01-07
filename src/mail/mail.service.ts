import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'handlebars';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  // ---------------- COMMON MAIL SENDER ----------------
  private async sendMail(
    to: string,
    subject: string,
    templateName: string,
    data: any,
  ) {
    try {
      const templatePath = path.join(
        __dirname,
        'templates',
        `${templateName}.hbs`,
      );

      const source = fs.readFileSync(templatePath, 'utf8');
      const template = hbs.compile(source);

      const html = template(data);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        html,
      });
    } catch (error) {
      this.logger.error(`Error while sending ${subject} mail`, error);
    }
  }

  // ---------------- WELCOME EMAIL ----------------
  async sendWelcomeMail(email: string, name: string, password: string) {
    await this.sendMail(email, 'Welcome to Company', 'welcome', {
      name,
      email,
      password,
    });
  }

  // ---------------- ACCOUNT LOCKED EMAIL ----------------
  async sendAccountLockedMail(email: string, name: string) {
    await this.sendMail(email, 'Account Locked', 'account-locked', {
      name,
    });
  }

  // ---------------- ACCOUNT ACTIVATED EMAIL ----------------
  async sendAccountActivatedMail(email: string, name: string) {
    await this.sendMail(email, 'Account Activated', 'account-activated', {
      name,
    });
  }
}
