import { genToken } from '@authdare/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";
import { ResourceService } from "../resource";


export const ENTITIES_TOKEN = genToken();

export const CONNECTION_OPTIONS_TOKEN = genToken();


@Injectable()
export class DBResourceManagerService {

    constructor(
        @Inject(ENTITIES_TOKEN) private readonly entities: any[],
        @Inject(CONNECTION_OPTIONS_TOKEN) private readonly connectionOptions: ConnectionOptions,
    ) { }

    async resourceService<E>(orgname: string, resourceName: string): Promise<ResourceService> {
        let con: Connection;

        try {
            con = getConnection(orgname);
        } catch (err) {
            Logger.error(err, DBResourceManagerService.name)
        }

        if (!con)
            try {
                con = await createConnection({ ...this.connectionOptions, type: 'sqlite', name: orgname, database: 'database/' + orgname + '.sqlite' });
            } catch (err) {
                throw new NotFoundException('Could not find the organization database!')
            }


        const entity = this.entities[resourceName];
        const repo = con.getRepository<E>(entity as any);
        const service = new ResourceService(repo);

        return service;
    }


}