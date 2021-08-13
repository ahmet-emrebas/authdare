import { DatabaseTokens } from './database-tokens';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Connection, createConnection, getConnection } from 'typeorm';
import { Queries } from './database.queries';

@Injectable({
    scope: Scope.REQUEST,
})
export class DatabaseService {
    constructor(@Inject(DatabaseTokens.TEMPLATE_DB) private readonly templateName: string) {}

    private async con() {
        let _con: Connection;
        try {
            _con = getConnection('admin-connection');
        } catch (err) {
            _con = await createConnection({
                name: 'admin-connection',
                type: 'postgres',
                database: 'postgres',
                username: 'postgres',
                password: 'password',
            });
        }

        return _con;
    }

    /**
     * Create an empty database
     * @param con
     * @param name
     */
    async createDB(name: string) {
        (await this.con()).query(Queries.create(name));
    }

    /**
     * Create database from the template db.
     * @param con
     * @param name
     */
    async createDBFromTemplate(name: string) {
        (await this.con()).query(Queries.terminate(this.templateName));
        (await this.con()).query(Queries.createFromTemplate(name, this.templateName));
    }
}
