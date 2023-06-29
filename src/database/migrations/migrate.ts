/* eslint-disable no-restricted-syntax, no-await-in-loop */
import { DatabaseAdapter } from '../types';
import { getMigrations } from './getMigrations';
import { readMigrationFiles } from './readMigrationFiles';

export async function migrate(this: DatabaseAdapter): Promise<void> {
  const { payload } = this;
  const migrationFiles = await readMigrationFiles({ payload });
  const { existingMigrations, latestBatch } = await getMigrations({ payload });

  const newBatch = latestBatch + 1;

  // Execute 'up' function for each migration sequentially
  for (const migration of migrationFiles) {
    const existingMigration = existingMigrations.find((existing) => existing.name === migration.name);

    // Run migration if not found in database
    if (existingMigration) {
      payload.logger.info({ msg: `${migration.name} already has already ran.` });
      // eslint-disable-next-line no-continue
      continue;
    }

    payload.logger.info({ msg: `Running migration ${migration.name}...` });
    try {
      await migration.up({ payload });
    } catch (err: unknown) {
      payload.logger.error({ msg: `Error running migration ${migration.name}`, err });
      throw err;
    }

    payload.logger.info({ msg: `${migration.name} done.` });

    await payload.create({
      collection: 'payload-migrations',
      data: {
        name: migration.name,
        batch: newBatch,
      },
    });
  }
}
