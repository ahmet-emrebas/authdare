import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TEMPLATE_DATABASE_TOKEN } from './database.tokens';
import { Queries } from './queries';

@Injectable()
export class DatabaseService {
    constructor(@Inject(TEMPLATE_DATABASE_TOKEN) private readonly templateName: string) {}

    /**
     * Create an empty database
     * @param con
     * @param name
     */
    async createDB(con: Connection, name: string) {
        await con.query(Queries.create(name));
    }

    /**
     * Create database from the template db.
     * @param con
     * @param name
     */
    async createDBFromTemplate(con: Connection, name: string) {
        await con.query(Queries.terminate(this.templateName));
        await con.query(Queries.createFromTemplate(name, this.templateName));
    }
}
