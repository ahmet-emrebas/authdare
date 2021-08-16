import { REQUEST } from '@nestjs/core';
import { Inject, Provider, Scope } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Connection, ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { Request } from 'express';

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
        scope: Scope.REQUEST,
        provide: options.name!,
        inject: [REQUEST],
        useFactory: async (req: Request) => {
            try {
                return getConnection(options.name);
            } catch (err) {
                return await createConnection({ ...options });
            }
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
