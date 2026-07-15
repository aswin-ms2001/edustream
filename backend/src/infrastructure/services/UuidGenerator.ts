import { v4 as uuidv4 } from 'uuid';
import type { IUuidGenerator } from '@/application/port/services/IUuidGenerator';

export class UuidGenerator implements IUuidGenerator {
  generate(): string {
    return uuidv4();
  }
}
