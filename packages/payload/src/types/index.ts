import type DataLoader from 'dataloader'
import type { i18n as Ii18n, TFunction } from 'i18next'

import type payload from '../'
import type { User } from '../auth/types'
import type { Collection, TypeWithID, TypeWithTimestamps } from '../collections/config/types'
import type { FindOneArgs } from '../database/types'
import type { validOperators } from './constants'

export type CustomPayloadRequest<U = any> = {
  /**
   * The collection being interacted with
   * Only available for collection routes
   */
  collection?: Collection
  context: RequestContext
  /** Data from the request body */
  data?: Record<string, unknown>
  /** The locale that should be used for a field when it is not translated to the requested locale */
  fallbackLocale?: string
  /**
   * TODO: Files with Standard Request
   * The files that were uploaded during this request
   */
  files?: {
    // placeholder
  }
  /** Cache of documents related to the current request */
  findByID?: {
    [transactionID: string]: {
      [slug: string]: (q: FindOneArgs) => Promise<TypeWithID>
    }
  }
  /** I18next instance */
  i18n: Ii18n
  /**
   * The requested locale if specified
   * Only available for localized collections
   */
  locale?: string
  payload: typeof payload
  /**
   * The context in which the request is being made
   */
  payloadAPI: 'GraphQL' | 'REST' | 'local'
  /** Optimized document loader */
  payloadDataLoader: DataLoader<string, TypeWithID>
  /** Resized versions of the image that was uploaded during this request */
  payloadUploadSizes?: Record<string, Buffer>
  /** Get a translation for the admin screen */
  t: TFunction
  /**
   * Identifier for the database transaction for interactions in a single, all-or-nothing operation.
   */
  transactionID?: number | string
  /**
   * Used to ensure consistency when multiple operations try to create a transaction concurrently on the same request
   */
  transactionIDPromise?: Promise<void>
  /** The signed in user */
  user: (U & User) | null
}
export type PayloadRequest<U = any> = Request & CustomPayloadRequest<U>
export interface RequestContext {
  [key: string]: unknown
}

export type Operator = (typeof validOperators)[number]

export type WhereField = {
  [key in Operator]?: unknown
}

export type Where = {
  [key: string]: Where[] | WhereField
  and?: Where[]
  or?: Where[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Document = any

export type Operation = 'create' | 'delete' | 'read' | 'update'
export type VersionOperations = 'readVersions'
export type AuthOperations = 'unlock'
export type AllOperations = AuthOperations | Operation | VersionOperations

export function docHasTimestamps(doc: any): doc is TypeWithTimestamps {
  return doc?.createdAt && doc?.updatedAt
}
