import { IGetConnectionOptions, Request } from './../interface';
import { Provider, Scope } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Connection } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { uuid } from './uuid';
import { GET_CONNECTION_OPTIONS } from '../class';

export function ProvideRepository(connectionKey: string, entity: ClassConstructor<any>): Provider {
    return {
        inject: [connectionKey],
        provide: entity,
        useFactory: async (con: Connection) => {
            return con.getRepository(entity);
        },
    };
}

/**
 * @param connectionToken The token used to inject the connection
 * @param iGetConnectionToken The token used to get the implementation of IGetConenctionOptions fromt he scope and use it to create a new conenction or get the existing one.
 * @returns
 */
export function ProvideConnection(): Provider {
    return {
        scope: Scope.REQUEST,
        provide: 'b01c982e-ad85-4359-8d5e-8762bcfac0b2',
        inject: [GET_CONNECTION_OPTIONS],
        useFactory: async function (getOptions: IGetConnectionOptions) {
            return await getOptions.get();
        },
    };
}

export function ProvideRepositories(entities: ClassConstructor<any>[]) {
    const connectionProvider = ProvideConnection();
    const entitiesProvider = entities.map((e) => ProvideRepository('connectionToken', e));
    return [connectionProvider, ...entitiesProvider];
}
