import { Inject, Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { waitFor } from '.';

export function ProvideRepository(connectionKey: string, entity: ClassConstructor<any>): Provider {
    return {
        inject: [connectionKey],
        provide: entity,
        useFactory: async (con: Connection) => {
            return con.getRepository(entity);
        },
    };
}

export function ProvideConnection(options: ConnectionOptions): Provider {
    return {
        provide: options.name!,
        useFactory: async () => {
            return await createConnection(options);
        },
    };
}

export function ProvideRepositories(connectionOptions: ConnectionOptions) {
    const connectionProvider = ProvideConnection(connectionOptions);
    const entitiesProvider = connectionOptions.entities!.map((e) =>
        ProvideRepository(connectionOptions.name!, e as ClassConstructor<any>),
    );
    return [connectionProvider, ...entitiesProvider];
}
