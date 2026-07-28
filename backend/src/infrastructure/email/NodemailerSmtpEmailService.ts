import nodemailer from 'nodemailer';
import type { IEmailService, InstitutionAdminInvitationEmailDto, TeacherInvitationEmailDto } from '@/application/email';
import type { ILogger } from '@/application/port/services/ILogger';
import { EmailDeliveryError } from '@/application/errors/EmailDeliveryError';
import { EmailTemplateEngine } from './EmailTemplateEngine';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromName: string;
  fromAddress: string;
}

export class NodemailerSmtpEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private config: SmtpConfig,
    private logger: ILogger
  ) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  async sendInstitutionAdminInvitation(data: InstitutionAdminInvitationEmailDto): Promise<void> {
    const { subject, html } = EmailTemplateEngine.renderInstitutionAdminInvitation(data);
    await this.sendMail(data.to, subject, html, 'InstitutionAdminInvitation');
  }

  async sendTeacherInvitation(data: TeacherInvitationEmailDto): Promise<void> {
    const { subject, html } = EmailTemplateEngine.renderTeacherInvitation(data);
    await this.sendMail(data.to, subject, html, 'TeacherInvitation');
  }

  private async sendMail(to: string, subject: string, html: string, context: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"${this.config.fromName}" <${this.config.fromAddress}>`,
        to,
        subject,
        html,
      });
      this.logger.info(`[EMAIL] ${context} delivered successfully to ${to}`);
    } catch (error: any) {
      this.logger.error(`[EMAIL] Failed to deliver ${context} to ${to}:`, {
        error: error.message,
        stack: error.stack,
      });
      throw new EmailDeliveryError(`Failed to send email to ${to}`);
    }
  }
}
