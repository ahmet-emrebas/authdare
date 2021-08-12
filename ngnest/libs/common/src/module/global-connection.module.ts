import { Global, Scope, Module, DynamicModule } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Connection } from 'typeorm';

export const GLOBAL_CONNECTION_TOKEN = '44c3a4c1-e6e5-4dc2-be59-c7d208792984';

export type GlobalConnectionHandler = (req: Request) => Promise<Connection>;

export const GlobalConnectionProvider = (getClientConnection: GlobalConnectionHandler) => {
    return {
        inject: [REQUEST],
        scope: Scope.REQUEST,
        provide: GLOBAL_CONNECTION_TOKEN,
        useFactory: async (req: Request) => {
            return await getClientConnection(req);
        },
    };
};

/**
 * Import this module in your application to create a global connection provider across the app.
 */
@Global()
@Module({})
export class GlobalConnectionModule {
    static async configure(getClientConnection: GlobalConnectionHandler): Promise<DynamicModule> {
        return {
            module: GlobalConnectionModule,
            providers: [GlobalConnectionProvider(getClientConnection)],
            exports: [GLOBAL_CONNECTION_TOKEN],
        };
    }
}
