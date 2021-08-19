import { ConnectionTokens } from '@authdare/common/db';
import { Global, Module } from '@nestjs/common';
import { getConnection, createConnection } from 'typeorm';
import { ColumnEntity, DatabaseEntity, TableEntity } from './database';

/**
 * Provide global resource and monitor connections
 */
@Global()
@Module({
    providers: [
        {
            provide: ConnectionTokens.CMS,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.CMS);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.CMS,
                        type: 'postgres',
                        url: 'postgres://postgres:password@localhost/authdare_resource',
                        entities: [DatabaseEntity, ColumnEntity, TableEntity],
                        synchronize: true,
                    });
                }
            },
        },
    ],
    exports: [ConnectionTokens.CMS],
})
export class ConnectionModule {}
