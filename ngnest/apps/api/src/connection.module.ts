import { ConnectionTokens } from '@authdare/common/db';
import { Global, Module, Scope } from '@nestjs/common';
import { getConnection, createConnection } from 'typeorm';
import { ColumnEntity, DatabaseEntity, TableEntity } from './database';

/**
 * Provide global resource and monitor connections
 */
@Global()
@Module({
    providers: [
        {
            provide: ConnectionTokens.RESOURCE,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.RESOURCE);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.RESOURCE,
                        type: 'postgres',
                        url: 'postgres://postgres:password@localhost/authdare_resource',
                        entities: [DatabaseEntity, ColumnEntity, TableEntity],
                        synchronize: true,
                    });
                }
            },
        },
    ],
    exports: [
        ConnectionTokens.AUTH,
        ConnectionTokens.RESOURCE,
        ConnectionTokens.MONITOR,
        ConnectionTokens.SECURE,
        ConnectionTokens.PUBLIC,
    ],
})
export class ConnectionModule {}
