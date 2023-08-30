import type { NextFunction, Response } from 'express'
import type { Config as GeneratedTypes } from 'payload/generated-types'

import httpStatus from 'http-status'

import type { PayloadRequest } from '../../express/types.js'

import formatSuccessResponse from '../../express/responses/formatSuccess.js'
import update from '../operations/update.js'

export default async function updateHandler(
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<GeneratedTypes['collections']['_preference']> | void> {
  try {
    const doc = await update({
      key: req.params.key,
      req,
      user: req.user,
      value: req.body.value || req.body,
    })

    return res.status(httpStatus.OK).json({
      ...formatSuccessResponse(req.t('general:updatedSuccessfully'), 'message'),
      doc,
    })
  } catch (error) {
    return next(error)
  }
}
