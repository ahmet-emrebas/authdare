import { Provider, Scope } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SessionDatabase } from '../interface/session-database';

const CONNECTION_TOKEN = 'b01c982e-ad85-4359-8d5e-8762bcfac0b2';

/**
 * @param connectionToken The token used to inject the connection
 * @param iGetConnectionToken The token used to get the implementation of IGetConenctionOptions fromt he scope and use it to create a new conenction or get the existing one.
 * @returns
 */
export function ProvideConnection(key: keyof SessionDatabase): Provider<Promise<Connection>> {
    return {
        scope: Scope.REQUEST,
        provide: CONNECTION_TOKEN,
        useFactory: async function () {
            throw new Error('Provide Connection');
        },
    };
}
