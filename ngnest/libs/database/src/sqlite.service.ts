import { ENTITIES_TOKEN } from './entities-token';
import { Connection, getConnection, createConnection, Repository } from 'typeorm';
import { ClassConstructor } from 'class-transformer';
import { DatabaseService } from './database-service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SQLiteService implements DatabaseService {

    constructor(@Inject(ENTITIES_TOKEN) private readonly entities: []) { }

    async getConnection(orgname: string) {
        let con: Connection;
        try {
            con = getConnection(orgname);
        } catch (err) {
            con = await createConnection({
                type: 'sqlite',
                database: `database/${orgname}/main.sqlite`,
                entities: this.entities
            });
        }
        return con;
    }


    async createDatabase(orgname: string): Promise<Connection> {
        return await createConnection({
            type: 'sqlite',
            database: `database/${orgname}/main.sqlite`,
            entities: this.entities,
            synchronize: true,
            dropSchema: true,
        });
    }

    async getRepository<T = any>(orgname: string, entity: ClassConstructor<T>) {
        return (await this.getConnection(orgname)).getRepository(entity);
    }

    async deleteDatabase(orgname: string) {
        throw new Error("Not implemented")
    }




}