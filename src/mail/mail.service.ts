export abstract class MailService {
  abstract sendMail(): Promise<string>;
}
