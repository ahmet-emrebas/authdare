import { entities } from './../entities';
import { BaseResourceService } from './../services/base.resource-service';

import { Connection, getConnection, createConnection } from 'typeorm';

export async function getResourceService(orgname: string, entityConstructor: any, createDTO: any, updateDTO: any) {
    let con: Connection;

    try {
        con = await getConnection(orgname)
    } catch (err) {
        con = await createConnection({
            name: orgname,
            type: 'sqlite',
            database: `database/${orgname}.sqlite`,
            entities
        })
    }
    const repo = con.getRepository(entityConstructor);

    return new BaseResourceService(repo, createDTO, updateDTO);
}


