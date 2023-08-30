import history from 'connect-history-api-fallback'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import type { PayloadHandler } from '../../../config/types.js'
import type { Payload } from '../../../payload.js'

import { getDevConfig } from '../configs/dev.js'

const router = express.Router()

type DevAdminType = (options: { payload: Payload }) => Promise<PayloadHandler>
export const devAdmin: DevAdminType = async ({ payload }) => {
  router.use(history())

  try {
    const webpackConfig = getDevConfig(payload.config)
    const compiler = webpack(webpackConfig)

    router.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/',
      }),
    )

    router.use(webpackHotMiddleware(compiler))
  } catch (err) {
    console.error(err)
    throw new Error('Error: there was an error creating the webpack dev server.')
  }

  return router
}
