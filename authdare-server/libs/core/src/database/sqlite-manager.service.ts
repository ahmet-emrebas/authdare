import { DBManager, ENTITIES_TOKEN } from './db-manager';
import { Inject, Injectable, } from '@nestjs/common';
import { Connection, } from "typeorm";
import { ResourceService } from "../resource";
import { connectDB } from './connect-db';

import { getService } from './get-service';
import { getSQLiteDBName } from './get-sqlite-db-name';

export type SqliteDBOptions = {
    orgname: string;
    resourceName: string;
}

@Injectable()
export class SqliteManagerService implements DBManager<SqliteDBOptions> {
    constructor(@Inject(ENTITIES_TOKEN) private readonly entities: any[]) { }

    async resource<E>({ orgname, resourceName }: SqliteDBOptions): Promise<ResourceService> {
        let con: Connection = await connectDB({
            name: orgname,
            type: 'sqlite',
            entities: this.entities,
            database: getSQLiteDBName(orgname)
        })
        return getService<E>(con, this.entities, resourceName);
    }

}