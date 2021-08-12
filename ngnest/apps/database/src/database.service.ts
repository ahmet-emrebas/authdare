import { GLOBAL_CONNECTION_TOKEN } from '@authdare/common/module';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TEMPLATE_DATABASE_TOKEN } from './database.consts';
import { Queries } from './queries';

@Injectable()
export class DatabaseService {
    constructor(
        @Inject(GLOBAL_CONNECTION_TOKEN) private readonly con: Connection,
        @Inject(TEMPLATE_DATABASE_TOKEN) private readonly templateName: string,
    ) {}

    /**
     * Create an empty database
     * @param con
     * @param name
     */
    async createDB(name: string) {
        await this.con.query(Queries.create(name));
    }

    /**
     * Create database from the template db.
     * @param con
     * @param name
     */
    async createDBFromTemplate(name: string) {
        await this.con.query(Queries.terminate(this.templateName));
        await this.con.query(Queries.createFromTemplate(name, this.templateName));
    }

}
