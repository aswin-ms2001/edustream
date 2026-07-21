import { ApplicationError } from './ApplicationError';

export class AuthorizationError extends ApplicationError {
  constructor(message = 'Access forbidden') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}
