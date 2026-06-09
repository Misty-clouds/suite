import { Injectable, Logger } from '@nestjs/common';

/**
 * Delivers transactional emails. No SMTP provider is configured yet, so codes
 * are logged to the server console. Wire a real transport (nodemailer, Resend,
 * SES, etc.) inside `send()` and the rest of the app stays unchanged.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendPasswordResetCode(email: string, code: string): Promise<void> {
    await this.send(
      email,
      'Your password reset code',
      `Your Suite password reset code is ${code}. It expires in 10 minutes.`,
    );
    // Highly visible in dev logs so the flow is testable without a mailbox.
    this.logger.log(`[DEV] Password reset code for ${email}: ${code}`);
  }

  private async send(to: string, subject: string, body: string): Promise<void> {
    // TODO: integrate a real email provider here.
    this.logger.debug(`Email -> ${to} | ${subject} | ${body}`);
    return Promise.resolve();
  }
}
