import { EventEntity } from '@authdare/event';
import { ConnectionTokens } from '@authdare/common/db';
import { ConfigEntity } from '@authdare/config';
import { Global, Module } from '@nestjs/common';
import { getConnection, createConnection } from 'typeorm';
import { SignupDetailsEntity, PublicUserEntity, SignupEntity } from '@authdare/signup';
import { I18nKeyEntity, I18nValueEntity } from '@authdare/i18n';
import { MailEntity, MailTemplatesEntity } from '@authdare/mail';
import { LogEntity } from '@authdare/log';
import { waitFor } from '@authdare/common/util';

const CONNECTION_URL =
    process.env.DATABASE_URL || 'postgres://postgres:password@localhost/authdare_main';
/**
 * Provide global resource and monitor connections
 */
@Global()
@Module({
    providers: [
        {
            provide: ConnectionTokens.RESOURCE,
            useFactory: async () => {
                await waitFor(1000);
                try {
                    return getConnection(ConnectionTokens.RESOURCE);
                } catch (err) {
                    return await createConnection({
                        name: 'authdare_resource',
                        type: 'postgres',
                        url: CONNECTION_URL,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                        entities: [],
                        synchronize: true,
                    });
                }
            },
        },
        {
            provide: ConnectionTokens.MONITOR,
            useFactory: async () => {
                await waitFor(2000);
                try {
                    return getConnection(ConnectionTokens.MONITOR);
                } catch (err) {
                    return await createConnection({
                        name: 'authdare_monitor',
                        type: 'postgres',
                        url: CONNECTION_URL,
                        ssl: {
                            rejectUnauthorized: false,
                        },
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
            useFactory: async () => {
                await waitFor(3000);
                try {
                    return getConnection(ConnectionTokens.AUTH);
                } catch (err) {
                    return await createConnection({
                        name: 'authdare_auth',
                        type: 'postgres',
                        url: CONNECTION_URL,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                        entities: [SignupEntity, SignupDetailsEntity, PublicUserEntity],
                        synchronize: true,
                    });
                }
            },
        },
        {
            provide: ConnectionTokens.PUBLIC,
            useFactory: async () => {
                await waitFor(4000);
                try {
                    return getConnection(ConnectionTokens.PUBLIC);
                } catch (err) {
                    return await createConnection({
                        name: 'authdare_public',
                        type: 'postgres',
                        url: CONNECTION_URL,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                        entities: [],
                        synchronize: true,
                    });
                }
            },
        },
        {
            provide: ConnectionTokens.SECURE,
            useFactory: async () => {
                await waitFor(5000);
                try {
                    return getConnection(ConnectionTokens.SECURE);
                } catch (err) {
                    return await createConnection({
                        name: 'authdare_secure',
                        type: 'postgres',
                        url: CONNECTION_URL,
                        ssl: {
                            rejectUnauthorized: false,
                        },
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
