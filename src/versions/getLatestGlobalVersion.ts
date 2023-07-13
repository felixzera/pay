import { Payload } from '../payload';
import { docHasTimestamps, Document, Where } from '../types';
import { SanitizedGlobalConfig } from '../globals/config/types';

type Args = {
  payload: Payload
  where: Where
  slug: string
  config: SanitizedGlobalConfig
  locale?: string
  transactionID?: string | number
}

export const getLatestGlobalVersion = async ({
  payload,
  config,
  slug,
  where,
  locale,
  transactionID,
}: Args): Promise<{global: Document, globalExists: boolean}> => {
  let latestVersion;

  if (config.versions?.drafts) {
    // eslint-disable-next-line prefer-destructuring
    latestVersion = (await payload.db.findGlobalVersions({
      global: slug,
      limit: 1,
      sort: '-updatedAt',
      locale,
      transactionID,
    })).docs[0];
  }

  const global = await payload.db.findGlobal({
    slug,
    where,
    locale,
    transactionID,
  });
  const globalExists = Boolean(global);

  if (!latestVersion || (docHasTimestamps(global) && latestVersion.updatedAt < global.updatedAt)) {
    return {
      global,
      globalExists,
    };
  }

  return {
    global: {
      ...latestVersion.version,
      updatedAt: latestVersion.updatedAt,
      createdAt: latestVersion.createdAt,
    },
    globalExists,
  };
};
