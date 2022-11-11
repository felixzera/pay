import { Forbidden } from '../errors';
import { Access, AccessResult } from '../config/types';

const executeAccess = async (operation, access: Access): Promise<AccessResult> => {
  if (access) {
    const result = await access(operation);

    if (!result) {
      if (!operation.disableErrors) throw new Forbidden(operation.req.i18n);
    }

    return result;
  }

  if (operation.req.user) {
    return true;
  }

  if (!operation.disableErrors) throw new Forbidden(operation.req.i18n);
  return false;
};

export default executeAccess;
