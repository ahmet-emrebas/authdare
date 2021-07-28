import { values } from "lodash";
import { Connection, createConnection, getConnection } from "typeorm";
import { BaseResourceService } from "./base-resource.service";
import { getModelMap } from "./model-map";

/**
 * 
 * @param {string} resourcePath users, tasks, orgs, etc.
 * @param orgname 
 * @returns 
 */
export async function getResourceService(resourcePath: string, orgname: string) {
    let con: Connection
    const modelMap = await getModelMap()
    try {
        con = getConnection(orgname)
    } catch (err) {
        con = await createConnection({
            type: 'sqlite',
            database: `database/${orgname}/main.sqlite`,
            entities: values(modelMap).map(e => e.entity)
        });
    }
    const entityMeta = modelMap[resourcePath];
    const repository = con.getRepository(entityMeta.entity);
    return new BaseResourceService(repository, entityMeta.create, entityMeta.update)
}