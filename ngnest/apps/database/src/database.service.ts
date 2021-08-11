import { DPT } from './database-provider.tokens';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Connection, getConnection, createConnection, getManager } from 'typeorm';

@Injectable({})
export class DatabaseService {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        @Inject(DPT.DATABASE_TEMPLATE_NAME)
        private readonly dbTemplateName: string,
    ) {}

    private async getCon(): Promise<Connection> {
        try {
            return getConnection();
        } catch (err) {
            return await createConnection();
        }
    }
    /**
     * @returns app dbs;
     */
    async databases(): Promise<string[]> {
        const con = await this.getCon();
        const allDBs = (await con.query('SELECT datname FROM pg_database;')).map(
            (e: any) => e.datname,
        ) as string[];

        const authdareDbs = allDBs.filter((e: string) => e.startsWith('authdare_')).sort();
        return authdareDbs;
    }

    /**
     * TO create database from template, we should make sure there is no active conenction to that database.
     */
    async terminateTemplateConnections() {
        const con = await this.getCon();
        const terminateProcessQuery = `
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = '${this.dbTemplateName}' and state = 'idle';`;
        await con.query(terminateProcessQuery);
    }

    /**
     * @returns modified name of the database.
     * @param name name of the database
     */
    async createDatabase(name: string): Promise<string> {
        const con = await this.getCon();
        const newDatabaseName = name + new Date().getTime();

        await this.terminateTemplateConnections();

        const CREATE_DB_QUERY = `
        CREATE DATABASE ${newDatabaseName}
        TEMPLATE '${this.dbTemplateName}';
        `;

        try {
            const __result = await con.query(CREATE_DB_QUERY);
            this.logger.log(`CREATED CLIENT DATABASE ${newDatabaseName}`);
            return newDatabaseName;
        } catch (err) {
            this.logger.error(err);
            throw new Error(`Could not create the database ${newDatabaseName}`);
        }
    }
}

// let dbConfig: ConnectionOptions = null as any as ConnectionOptions;

// const __con = await createConnection({ ...conf.connection });
// const __databaseName = 'authdare_' + new Date().getTime();
// const __result = await __con.query('SELECT datname FROM pg_database;');
// const __dbs = (__result.map((e: any) => e.datname) as string[])
//     .filter((e) => e.startsWith('authdare'))
//     .sort();
// const __oldDB = __dbs.pop();

// await __con.query(`CREATE DATABASE ${__databaseName} TEMPLATE ${__oldDB};`);

// await __con.close();

// dbConfig = {
//     ...conf.connection,
//     type: 'postgres',
//     database: __databaseName,
// };
