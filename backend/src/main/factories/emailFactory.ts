import { NodemailerSmtpEmailService } from '@/infrastructure/email/NodemailerSmtpEmailService';
import { env } from '@/infrastructure/config/env';
import { logger } from './loggerFactory';
import type { IEmailService } from '@/application/email';

export const emailService: IEmailService = new NodemailerSmtpEmailService(
  {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER || '',
      pass: env.SMTP_PASS || '',
    },
    fromName: env.EMAIL_FROM_NAME,
    fromAddress: env.EMAIL_FROM_ADDRESS,
  },
  logger
);
