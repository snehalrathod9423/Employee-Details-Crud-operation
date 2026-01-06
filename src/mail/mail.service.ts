import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as hbs from 'handlebars';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendWelcomeMail(email: string, name: string, password: string) {
    try {
      // 1. Read handlebars template
      const templatePath = path.join(
        __dirname,
        'templates',
        'welcome.hbs',
      );

      const source = fs.readFileSync(templatePath, 'utf8');
      const template = hbs.compile(source);

      // 2. Replace values in template
      const html = template({
        name,
        email,
        password,
      });

      // 3. Create mail transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // 4. Send email
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Welcome to Company',
        html,
      });
    } catch (error) {
      this.logger.error('Error while sending welcome email', error);
    }
  }
}
