import { Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Connection, ConnectionOptions, getConnection, createConnection } from 'typeorm';
import { MAIN_CONNECTION_OPTIONS } from './main-connection-options.provider';

export function registerEntitiesToMain(
    token: string,
    entities: ClassConstructor<any>[],
): Provider<any>[] {
    return [
        {
            provide: token,
            inject: [MAIN_CONNECTION_OPTIONS],
            useFactory: async (options: ConnectionOptions) => {
                try {
                    return getConnection(token);
                } catch (err) {
                    return await createConnection({
                        ...options,
                        name: token,
                        entities,
                    });
                }
            },
        },
        ...entities.map((entity) => {
            return {
                provide: entity,
                inject: [token],
                useFactory: (con: Connection) => {
                    return con.getRepository(entity);
                },
            };
        }),
    ];
}
