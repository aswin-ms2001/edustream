import { ApplicationError } from './ApplicationError';

export class ValidationError extends ApplicationError {
  constructor(message = 'Validation failed') {
    super(message, 'VALIDATION_ERROR', 400);
  }
}
