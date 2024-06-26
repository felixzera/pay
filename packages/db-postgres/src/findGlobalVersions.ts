import type { FindGlobalVersions } from 'payload/database'
import type { PayloadRequest, SanitizedGlobalConfig } from 'payload/types'

import { buildVersionGlobalFields } from 'payload/versions'

import type { PostgresAdapter } from './types'

import { findMany } from './find/findMany'
import { getTableName } from './schema/getTableName'

export const findGlobalVersions: FindGlobalVersions = async function findGlobalVersions(
  this: PostgresAdapter,
  {
    global,
    limit,
    locale,
    page,
    pagination,
    req = {} as PayloadRequest,
    skip,
    sort: sortArg,
    where,
  },
) {
  const globalConfig: SanitizedGlobalConfig = this.payload.globals.config.find(
    ({ slug }) => slug === global,
  )
  const sort = typeof sortArg === 'string' ? sortArg : '-createdAt'

  const tableName = getTableName({
    adapter: this,
    config: globalConfig,
    versions: true,
  })
  const fields = buildVersionGlobalFields(globalConfig)

  return findMany({
    adapter: this,
    fields,
    limit,
    locale,
    page,
    pagination,
    req,
    skip,
    sort,
    tableName,
    where,
  })
}
