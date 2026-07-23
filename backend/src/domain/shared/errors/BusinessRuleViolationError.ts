import { DomainError } from './DomainError';

export class BusinessRuleViolationError extends DomainError {
  constructor(message: string, code = 'BUSINESS_RULE_VIOLATION') {
    super(message, code);
  }
}
