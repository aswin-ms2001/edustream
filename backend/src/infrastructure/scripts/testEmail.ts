/**
 * TOOLING NOTE:
 * testEmail.ts is an Infrastructure verification utility script.
 * It exists solely for validating SMTP configuration and template rendering during development.
 * It is NOT part of the application production runtime and MUST NEVER be imported by production code.
 */

import { emailService } from '@/main/factories/emailFactory';
import { logger } from '@/main/factories/loggerFactory';

async function testEmail() {
  try {
    logger.info('[TEST EMAIL] Attempting to send test Institution Admin Invitation email...');

    await emailService.sendInstitutionAdminInvitation({
      to: 'test-admin@example.com',
      recipientName: 'Test Admin',
      institutionName: 'EduStream Academy',
      invitationLink: 'http://localhost:3000/accept-invitation?token=test-token-123',
      expiresInHours: 24,
    });

    logger.info('[TEST EMAIL] Test email execution finished cleanly.');
    process.exit(0);
  } catch (error) {
    logger.error('[TEST EMAIL] Test email execution failed:', error);
    process.exit(1);
  }
}

testEmail();
