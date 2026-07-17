import mongoose from 'mongoose';
import type { ITransactionManager } from '@/application/port/services/ITransactionManager';
import type { ITransactionContext } from '@/domain/session/repositories/ISessionRepository';

export class MongooseTransactionManager implements ITransactionManager {
  async execute<T>(work: (context: ITransactionContext) => Promise<T>): Promise<T> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const result = await work({ session });
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
