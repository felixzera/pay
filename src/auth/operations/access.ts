import type { PayloadRequest } from '../../express/types';
import type { CollectionPermission, GlobalPermission, Permissions } from '../types';
import { adminInit as adminInitTelemetry } from '../../utilities/telemetry/events/adminInit';
import { getEntityPermissions } from '../../utilities/getEntityPermissions';

const allOperations = ['create', 'read', 'update', 'delete'];

type Arguments = {
  req: PayloadRequest
}

async function accessOperation(args: Arguments): Promise<Permissions> {
  const {
    req,
    req: {
      user,
      payload: {
        config,
      },
    },
  } = args;

  adminInitTelemetry(req);

  const results = {} as Permissions;
  const promises = [];

  const isLoggedIn = !!(user);
  const userCollectionConfig = (user && user.collection) ? config.collections.find((collection) => collection.slug === user.collection) : null;


  if (userCollectionConfig) {
    results.canAccessAdmin = userCollectionConfig.access.admin ? await userCollectionConfig.access.admin(args) : isLoggedIn;
  } else {
    results.canAccessAdmin = false;
  }

  config.collections.forEach((collection) => {
    const collectionOperations = [...allOperations];

    if (collection.auth && (typeof collection.auth.maxLoginAttempts !== 'undefined' && collection.auth.maxLoginAttempts !== 0)) {
      collectionOperations.push('unlock');
    }

    if (collection.versions) {
      collectionOperations.push('readVersions');
    }

    const [collectionPolicy, collectionPromises] = getEntityPermissions<CollectionPermission>({
      req,
      entity: collection,
      operations: collectionOperations,
    });
    results.collections = {
      ...results.collections,
      [collection.slug]: collectionPolicy,
    };
    promises.push(collectionPromises);
  });

  config.globals.forEach((global) => {
    const globalOperations = ['read', 'update'];

    if (global.versions) {
      globalOperations.push('readVersions');
    }

    const [globalPolicy, globalPromises] = getEntityPermissions<GlobalPermission>({
      req,
      entity: global,
      operations: globalOperations,
    });
    results.globals = {
      ...results.globals,
      [global.slug]: globalPolicy,
    };
    promises.push(globalPromises);
  });

  await Promise.all(promises);

  return results;
}

export default accessOperation;
