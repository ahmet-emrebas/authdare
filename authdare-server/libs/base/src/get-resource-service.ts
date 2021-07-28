import { BaseResourceService } from './base-resource.service';
import { getDBConnection } from './get-db-connection';
import { getModelMap } from './model-map';

/**
 *
 * @param {string} resourcePath users, tasks, orgs, etc.
 * @param orgname
 * @returns
 */
export async function getResourceService<T = any, C = any, U = any>(
  resourcePath: string,
  orgname: string,
) {
  const con = await getDBConnection(orgname, false, false);
  const modelMap = await getModelMap();
  const entityMeta = modelMap[resourcePath];
  const repository = con.getRepository<T>(entityMeta.entity);
  return new BaseResourceService<T, C, U>(
    repository,
    entityMeta.create,
    entityMeta.update,
  );
}
