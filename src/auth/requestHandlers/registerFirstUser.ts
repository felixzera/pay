import { NextFunction, Response } from 'express';
import { PayloadRequest } from '../../express/types';
import registerFirstUser from '../operations/registerFirstUser';

export default async function registerFirstUserHandler(req: PayloadRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    await req.payload.db.beginTransaction();
    const firstUser = await registerFirstUser({
      req,
      res,
      collection: req.collection,
      data: req.body,
    });
    await req.payload.db.commitTransaction();

    return res.status(201).json(firstUser);
  } catch (error) {
    return next(error);
  }
}
