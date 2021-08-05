import { ClassConstructor } from 'class-transformer';
import { getConnection, createConnection } from 'typeorm';

export async function getConByOrgname(orgname: string, entities: ClassConstructor<any>[]) {
    try {
        return getConnection(orgname)
    } catch (err) {
        return await createConnection({
            name: orgname,
            type: 'sqlite',
            database: `database/${orgname}/main.sqlite`,
            entities: entities
        })
    }
}


export async function getRepositoryByOrgname<T = any>(orgname: string, entity: ClassConstructor<T>, entities: ClassConstructor<any>[]) {
    return (await getConByOrgname(orgname, [entity, ...entities])).getRepository(entity);
}

