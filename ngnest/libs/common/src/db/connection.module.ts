import { DynamicModule, Module } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ExternalConnectionProvider, CONNECTION } from './external-connection.provider';
import { SessionDatabase } from '../interface';
import { Provider } from '@nestjs/common';
import { ConnectionOptions, Connection, getConnection, createConnection } from 'typeorm';

@Module({})
export class ConnectionModule {
    static async configure(
        moduleDB: keyof SessionDatabase,
        entities: ClassConstructor<any>[],
    ): Promise<DynamicModule> {
        return {
            module: ConnectionModule,
            providers: [
                ExternalConnectionProvider(moduleDB, entities),
                ...RepositoryProvider(entities),
            ],
            exports: [CONNECTION, ...entities],
        };
    }
}

/**
 * @param TOKEN used as connection token for this connection
 * @param OPTIONS used to getting the connection options from the context.
 * @returns
 */
export function RepositoryProvider(entities: ClassConstructor<any>[]): Provider<any>[] {
    const repositoryProviders = entities.map((e) => {
        return {
            provide: e,
            inject: [CONNECTION],
            useFactory: async (con: Connection) => {
                return con.getRepository(e);
            },
        } as Provider;
    });

    return [...repositoryProviders];
}
