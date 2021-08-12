import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TEMPLATE_DATABASE_TOKEN } from './database.tokens';

const Queries = {
    /**
     * @returns string[] list of existing database names.
     */
    dbs: () => `SELECT datname FROM pg_database;`,

    /**
     * Close all open connections to the database.
     * @param dbName
     * @returns
     */
    terminate: (dbName: string) => `
    SELECT pg_terminate_backend(pid) 
    FROM pg_stat_activity 
    WHERE datname = '${dbName}';`,

    /**
     * Create new database from template so there is no deen to syncronize database.
     * @param name name of the new database
     * @param template the template from which database will be created.
     * @returns
     */
    createFromTemplate: (name: string, templateName: string) => `
    CREATE DATABASE ${name}
    TEMPLATE '${templateName}';
    `,

    /**
     * Create a new database
     * @param name
     * @returns
     */
    create: (name: string) => `
    CREATE DATABASE ${name};
    `,
};

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
