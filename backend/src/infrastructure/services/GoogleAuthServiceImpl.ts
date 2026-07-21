import type { IGoogleAuthService, IGoogleUser } from '@/domain/user/repositories/IGoogleAuthService';
import { OAuth2Client } from 'google-auth-library';
import { AuthenticationError } from '@/application/errors';

export class GoogleAuthServiceImpl implements IGoogleAuthService {
  private client: OAuth2Client;

  constructor(clientId: string) {
    this.client = new OAuth2Client(clientId);
  }

  async verifyToken(idToken: string): Promise<IGoogleUser> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID || '',
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name || !payload.sub) {
      throw new AuthenticationError('Invalid Google token payload');
    }

    return {
      email: payload.email,
      name: payload.name,
      googleId: payload.sub,
    };
  }
}
