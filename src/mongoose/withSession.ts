import type { ClientSession } from 'mongoose';
import { MongooseAdapter } from './index';

/**
 * returns the session belonging to the transaction of the req.session if exists
 * @returns ClientSession
 */
export function withSession(db: MongooseAdapter, transactionID: string | number): { session: ClientSession } | object {
  return db.sessions[transactionID] ? { session: db.sessions[transactionID] } : {};
}
