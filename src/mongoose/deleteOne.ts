import type { MongooseAdapter } from '.';
import type { DeleteOne } from '../database/types';
import type { Document } from '../types';
import sanitizeInternalFields from '../utilities/sanitizeInternalFields';
import { withSession } from './withSession';

export const deleteOne: DeleteOne = async function deleteOne(
  this: MongooseAdapter,
  { collection, where, transactionID },
) {
  const Model = this.collections[collection];
  const options = withSession(this, transactionID);

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  });

  const doc = await Model.findOneAndDelete(query, options).lean();

  let result: Document = JSON.parse(JSON.stringify(doc));

  // custom id type reset
  result.id = result._id;
  result = sanitizeInternalFields(result);

  return result;
};
