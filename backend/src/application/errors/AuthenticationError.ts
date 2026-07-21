import { ApplicationError } from './ApplicationError';

export class AuthenticationError extends ApplicationError {
  constructor(message = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}
