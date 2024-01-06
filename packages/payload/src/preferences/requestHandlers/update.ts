import httpStatus from 'http-status'

import type { PayloadHandler } from '../../exports/config'
import type { PayloadRequest } from '../../types'

import update from '../operations/update'

export const updateHandler: PayloadHandler = async ({ params, req }) => {
  const payloadRequest = req as PayloadRequest
  const doc = await update({
    key: params?.key as string,
    req: payloadRequest,
    user: payloadRequest?.user,
    value: payloadRequest.data.value || payloadRequest.data,
  })

  return Response.json(
    {
      ...doc,
      message: payloadRequest.t('general:updatedSuccessfully'),
    },
    {
      status: httpStatus.OK,
    },
  )
}
