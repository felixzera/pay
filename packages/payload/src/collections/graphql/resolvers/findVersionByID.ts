import type { PayloadRequest } from '../../../types'
import type { TypeWithVersion } from '../../../versions/types'
import type { Collection, TypeWithID } from '../../config/types'

import isolateObjectProperty from '../../../utilities/isolateObjectProperty'
import { findVersionByIDOperation } from '../../operations/findVersionByID'

export type Resolver<T extends TypeWithID = any> = (
  _: unknown,
  args: {
    draft: boolean
    fallbackLocale?: string
    id: number | string
    locale?: string
  },
  context: {
    req: PayloadRequest
  },
) => Promise<TypeWithVersion<T>>

export default function findVersionByIDResolver(collection: Collection): Resolver {
  return async function resolver(_, args, context) {
    let { req } = context
    const locale = req.locale
    const fallbackLocale = req.fallbackLocale
    req = isolateObjectProperty(req, 'locale')
    req = isolateObjectProperty(req, 'fallbackLocale')
    req.locale = args.locale || locale
    req.fallbackLocale = args.fallbackLocale || fallbackLocale

    const options = {
      id: args.id,
      collection,
      depth: 0,
      draft: args.draft,
      req: isolateObjectProperty<PayloadRequest>(req, 'transactionID'),
    }

    const result = await findVersionByIDOperation(options)

    return result
  }
}
