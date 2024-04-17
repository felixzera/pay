import fs from 'fs'
import path from 'path'

import type { Payload } from '../../index.js'
import type { Migration } from '../types.js'

/**
 * Read the migration files from disk
 */
export const readMigrationFiles = async ({
  payload,
}: {
  payload: Payload
}): Promise<Migration[]> => {
  if (!fs.existsSync(payload.db.migrationDir)) {
    payload.logger.error({
      msg: `No migration directory found at ${payload.db.migrationDir}`,
    })
    return []
  }

  payload.logger.info({
    msg: `Reading migration files from ${payload.db.migrationDir}`,
  })

  const files = fs
    .readdirSync(payload.db.migrationDir)
    .sort()
    .filter((f) => {
      return f.endsWith('.mts') || f.endsWith('.mjs')
    })
    .map((file) => {
      return path.resolve(payload.db.migrationDir, file)
    })

  return Promise.all(
    files.map(async (filePath) => {
      // eval used to circumvent errors bundling
      let migration = await eval(
        `${typeof require === 'function' ? 'require' : 'import'}('${filePath.replaceAll('\\', '/')}')`,
      )
      if ('default' in migration) migration = migration.default

      const result: Migration = {
        name: path.basename(filePath).split('.')?.[0],
        down: migration.down,
        up: migration.up,
      }

      return result
    }),
  )
}
