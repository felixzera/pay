import httpStatus from 'http-status'

import type { PayloadRequest, Where } from 'payload/types'
import { isNumber } from 'payload/utilities'
import { getTranslation } from '@payloadcms/translations'
import { deleteOperation } from 'payload/operations'

export const deleteDoc = async ({ req }: { req: PayloadRequest }): Promise<Response> => {
  const { searchParams } = new URL(req.url)
  const depth = searchParams.get('depth')
  const where = searchParams.get('where')

  const result = await deleteOperation({
    collection: req.collection,
    depth: isNumber(depth) ? depth : undefined,
    req,
    where: where ? (JSON.parse(where) as Where) : {},
  })

  if (result.errors.length === 0) {
    const message = req.t('general:deletedCountSuccessfully', {
      count: result.docs.length,
      label: getTranslation(
        req.collection.config.labels[result.docs.length > 1 ? 'plural' : 'singular'],
        req.i18n,
      ),
    })

    return Response.json(
      {
        ...result,
        message,
      },
      {
        status: httpStatus.OK,
      },
    )
  }

  const total = result.docs.length + result.errors.length
  const message = req.t('error:unableToDeleteCount', {
    count: result.errors.length,
    label: getTranslation(
      req.collection.config.labels[total > 1 ? 'plural' : 'singular'],
      req.i18n,
    ),
    total,
  })

  return Response.json(
    {
      ...result,
      message,
    },
    {
      status: httpStatus.BAD_REQUEST,
    },
  )
}
