import crypto from 'crypto';
import type { ITokenHashService } from '@/application/port/services/ITokenHashService';

export class CryptoTokenHashService implements ITokenHashService {
  hash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
