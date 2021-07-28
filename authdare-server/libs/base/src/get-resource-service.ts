import { BaseResourceService } from "./base-resource.service";
import { getDBConnection } from "./get-db-connection";
import { getModelMap } from "./model-map";

/**
 * 
 * @param {string} resourcePath users, tasks, orgs, etc.
 * @param orgname 
 * @returns 
 */
export async function getResourceService(resourcePath: string, orgname: string) {
    const con = await getDBConnection(orgname, false, false,)
    const modelMap = await getModelMap()
    const entityMeta = modelMap[resourcePath];
    const repository = con.getRepository(entityMeta.entity);
    return new BaseResourceService(repository, entityMeta.create, entityMeta.update)
}