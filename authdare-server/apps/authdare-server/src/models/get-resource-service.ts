import { getConnection, createConnection, ConnectionOptions } from 'typeorm';
import { ApiResourceService } from './../services';
import { getModelsMap } from "./models";

export async function getOrgConnection(options: ConnectionOptions) {
    try {
        return getConnection(options.name);
    } catch (err) {
        return await createConnection(options)
    }
}

export async function getResourceService(options: ConnectionOptions, resource: string) {
    const models = await getModelsMap()
    const model = models[resource];
    const con = await getOrgConnection(options);
    const repo = con.getRepository(model.entity);
    return new ApiResourceService(repo, model.create, model.update)
}