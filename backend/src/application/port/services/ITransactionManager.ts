import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export interface ITransactionManager {
  execute<T>(work: (context: ITransactionContext) => Promise<T>): Promise<T>;
}
