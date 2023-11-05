import fs from 'fs'
import path from 'path'

import { type Payload } from '../../packages/payload/src'
import { isMongoose } from './isMongoose'
import { resetDB } from './reset'
import { createSnapshot, dbSnapshot, restoreFromSnapshot } from './snapshot'

type SeedFunction = (_payload: Payload) => Promise<void>

export async function seedDB({
  shouldResetDB,
  _payload,
  collectionSlugs,
  snapshotKey,
  seedFunction,
  uploadsDir,
}: {
  _payload: Payload
  collectionSlugs: string[]
  seedFunction: SeedFunction
  shouldResetDB: boolean
  /**
   * Key to uniquely identify the kind of snapshot. Each test suite should pass in a unique key
   */
  snapshotKey: string
  uploadsDir?: string
}) {
  /**
   * Reset database and delete uploads directory
   */
  if (shouldResetDB) {
    let clearUploadsDirPromise: any = Promise.resolve()
    if (uploadsDir) {
      clearUploadsDirPromise = fs.promises
        .access(uploadsDir)
        .then(() => fs.promises.readdir(uploadsDir))
        .then((files) =>
          Promise.all(files.map((file) => fs.promises.rm(path.join(uploadsDir, file)))),
        )
        .catch((error) => {
          if (error.code !== 'ENOENT') {
            // If the error is not because the directory doesn't exist
            console.error('Error clearing the uploads directory:', error)
            throw error
          }
          // If the directory does not exist, resolve the promise (nothing to clear)
          return
        })
    }

    await Promise.all([resetDB(_payload), clearUploadsDirPromise])
  }

  /**
   * Mongoose-Only: Restore snapshot of old data if available
   */
  let restored = false
  if (
    dbSnapshot[snapshotKey] &&
    Object.keys(dbSnapshot[snapshotKey]).length &&
    isMongoose(_payload)
  ) {
    await restoreFromSnapshot(_payload, snapshotKey)
    restored = true
  }

  /**
   *  Mongoose: Re-create indexes
   *  Postgres: Re-Init the db to create all tables and indexes
   */
  // Dropping the db breaks indexes (on mongoose - did not test on postgres yet), so we recreate them here
  if (shouldResetDB) {
    if (isMongoose(_payload)) {
      await Promise.all([
        ...collectionSlugs.map(async (collectionSlug) => {
          await _payload.db.collections[collectionSlug].createIndexes()
        }),
      ])
    } else {
      // Run the db adapter's init method. For postgres, this seems to also create the indexes
      if (_payload?.db) {
        //await _payload.db.init(_payload) // Maybe we can do this for mongoose as well, rather than running createIndexes() manually?
        //process.env.PAYLOAD_DROP_DATABASE = 'false'
        //await _payload.db.connect(_payload)
      }
    }
  }

  /**
   * Postgres: Restore snapshot of old data if available. For postgres, this needs to happen AFTER the tables were created
   *
   * This does not work if I run payload.db.init or payload.db.connect anywhere. Thus, when resetting the database, we are not dropping the schema, but are instead only deleting the table values
   */
  if (
    dbSnapshot[snapshotKey] &&
    Object.keys(dbSnapshot[snapshotKey]).length &&
    !isMongoose(_payload)
  ) {
    //console.log('Restoring')
    await restoreFromSnapshot(_payload, snapshotKey)
    //console.log('Snapshot restored')
    restored = true
  }

  /**
   * If a snapshot was restored, we don't need to seed the database
   */
  if (restored) {
    return
  }

  /**
   * Seed the database with data and save it to a snapshot
   **/
  await seedFunction(_payload)

  await createSnapshot(_payload, snapshotKey)
}
