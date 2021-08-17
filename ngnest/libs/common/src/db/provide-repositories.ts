import { Provider, Scope } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Connection } from 'typeorm';
import { IGetClientDBConnection } from '../interface';
import { GET_CLIENT_DB_CONNECTION } from '../class';

const CONNECTION_TOKEN = 'b01c982e-ad85-4359-8d5e-8762bcfac0b2';

/**
 * @param connectionToken The token used to inject the connection
 * @param iGetConnectionToken The token used to get the implementation of IGetConenctionOptions fromt he scope and use it to create a new conenction or get the existing one.
 * @returns
 */
export function ProvideConnection(): Provider {
    return {
        scope: Scope.REQUEST,
        provide: CONNECTION_TOKEN,
        inject: [GET_CLIENT_DB_CONNECTION],
        useFactory: async function (getOptions: IGetClientDBConnection) {
            return await getOptions.get();
        },
    };
}

export function ProvideRepository(entity: ClassConstructor<any>): Provider {
    return {
        inject: [CONNECTION_TOKEN],
        provide: entity,
        useFactory: async (con: Connection) => {
            return con.getRepository(entity);
        },
    };
}

export function ProvideRepositories(entities: ClassConstructor<any>[]) {
    const connectionProvider = ProvideConnection();
    const entitiesProvider = entities.map((e) => ProvideRepository(e));
    return [connectionProvider, ...entitiesProvider];
}
