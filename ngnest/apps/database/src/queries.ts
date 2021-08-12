export const Queries = {
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
