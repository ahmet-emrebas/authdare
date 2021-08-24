import { EventEntity } from '@authdare/event';
import { ConnectionTokens } from '@authdare/common/db';
import { ConfigEntity } from '@authdare/config';
import { Global, Module, Scope } from '@nestjs/common';
import { getConnection, createConnection } from 'typeorm';
import { SignupDetailsEntity, PublicUserEntity, SignupEntity } from '@authdare/signup';
import { I18nKeyEntity, I18nValueEntity } from '@authdare/i18n';
import { MailEntity, MailTemplatesEntity } from '@authdare/mail';
import { LogEntity } from '@authdare/log';
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
                        type: 'sqlite',
                        database: 'database/authdare_resource.sqlite',
                        entities: [DatabaseEntity, ColumnEntity, TableEntity],
                        synchronize: true,
                    });
                }
            },
        },
        {
            provide: ConnectionTokens.MONITOR,
            scope: Scope.REQUEST,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.MONITOR);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.MONITOR,
                        type: 'sqlite',
                        database: './database/authdare_monitor.sqlite',
                        entities: [
                            EventEntity,
                            ConfigEntity,
                            I18nKeyEntity,
                            I18nValueEntity,
                            MailEntity,
                            MailTemplatesEntity,
                            LogEntity,
                        ],
                        synchronize: true,
                    });
                }
            },
        },
        {
            provide: ConnectionTokens.AUTH,
            scope: Scope.REQUEST,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.AUTH);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.AUTH,
                        type: 'sqlite',
                        database: './database/authdare_auth.sqlite',
                        entities: [SignupEntity, SignupDetailsEntity, PublicUserEntity],
                        synchronize: true,
                    });
                }
            },
        },
        {
            scope: Scope.REQUEST,
            provide: ConnectionTokens.PUBLIC,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.PUBLIC);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.PUBLIC,
                        type: 'sqlite',
                        database: './database/authdare_public.sqlite',
                        entities: [],
                        synchronize: true,
                    });
                }
            },
        },
        {
            scope: Scope.REQUEST,
            provide: ConnectionTokens.SECURE,
            useFactory: async () => {
                try {
                    return getConnection(ConnectionTokens.SECURE);
                } catch (err) {
                    return await createConnection({
                        name: ConnectionTokens.SECURE,
                        type: 'sqlite',
                        database: './database/authdare_secure.sqlite',
                        entities: [],
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
