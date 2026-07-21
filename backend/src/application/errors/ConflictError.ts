import { ApplicationError } from './ApplicationError';

export class ConflictError extends ApplicationError {
  constructor(message = 'Resource conflict') {
    super(message, 'CONFLICT', 409);
  }
}
