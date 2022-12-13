import { MailService } from './mail.service';

export class SMTPMail implements MailService {
  async sendMail(): Promise<string> {
    return 'smtp';
  }
}
