import { ApplicationError } from './ApplicationError';

export class EmailDeliveryError extends ApplicationError {
  constructor(message = 'Failed to deliver email message') {
    super(message, 'EMAIL_DELIVERY_FAILED', 500);
  }
}
