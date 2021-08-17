import { Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ConnectionOptions, Connection, getConnection, createConnection } from 'typeorm';

/**
 * @param TOKEN used as connection token for this connection
 * @param OPTIONS used to getting the connection options from the context.
 * @returns
 */
export function RepositoryProvider(
    TOKEN: string,
    OPTIONS: string,
    entities: ClassConstructor<any>[],
): Provider<any>[] {
    const connectionProvider: Provider<Promise<Connection>> = {
        provide: TOKEN,
        inject: [OPTIONS],
        useFactory: async (options: ConnectionOptions) => {
            let con: Connection;
            try {
                con = getConnection(options.name);
            } catch (err) {
                con = await createConnection(options);
            }
            return con;
        },
    };

    const repositoryProviders = entities.map((e) => {
        return {
            provide: e,
            inject: [TOKEN],
            useFactory: async (con: Connection) => {
                return con.getRepository(e);
            },
        } as Provider;
    });

    return [connectionProvider, ...repositoryProviders];
}
