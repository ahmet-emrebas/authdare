import { entities } from './../entities';
import { createConnection } from 'typeorm';

export async function syncronizeDatabase(orgname: string) {
    return await createConnection({
        name: orgname,
        type: 'sqlite',
        database: `database/${orgname}.sqlite`,
        entities,
        synchronize: true

    })
}