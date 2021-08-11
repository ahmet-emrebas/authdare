import { DPT } from './database-provider.tokens';
import { Global, Scope, Module, Logger, DynamicModule } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
    Connection,
    ConnectionOptions,
    createConnection,
    getConnection,
} from 'typeorm';

/**
 * Client Connection Module
 */
@Global()
@Module({})
export class CCM {
    static async configure(conf: ConnectionOptions): Promise<DynamicModule> {
        const logger = new Logger(CCM.name);
        const createClientCon = async (orgname: string) =>
            await createConnection({
                ...conf,
                type: 'postgres',
                name: orgname,
                database: orgname,
            });

        const getClientCon = async (orgname: string) => await getConnection(orgname);

        return {
            module: CCM,
            providers: [
                {
                    inject: [REQUEST],
                    scope: Scope.REQUEST,
                    provide: DPT.CLIENT_CONNECTION,
                    useFactory: async (req: Request) => {
                        const orgname =
                            (req.query.orgname as string) || req.params.orgname;
                        let con: Connection;
                        try {
                            con = await getClientCon(orgname);
                        } catch (err) {
                            con = await createClientCon(orgname);
                        }
                        return con;
                    },
                },
            ],
            exports: [DPT.CLIENT_CONNECTION],
        };
    }
}
