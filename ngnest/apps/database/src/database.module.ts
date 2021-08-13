import { ResourceController } from './resource.controller';
import { REQUEST } from '@nestjs/core';
import { DatabaseTokens } from './database-tokens';
import { DatabaseService } from './database.service';
import { Module, DynamicModule, Global, Logger, Scope, NotFoundException } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions, getConnection, createConnection, Connection } from 'typeorm';
import { values } from 'lodash';
import { Request } from 'express';

const TEMPLATE_DATABASE_NAME = 'authdare_template';
const MAIN_DATABASE_NAME = 'authdare_main';

const commonConnectionOptions: ConnectionOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'password',
};

export function clientConnectionOptions(orgname: string): ConnectionOptions {
    return {
        ...commonConnectionOptions,
        name: orgname,
        database: orgname,
    } as ConnectionOptions;
}

export function adminConnectionOptions(database: string): ConnectionOptions {
    return {
        ...commonConnectionOptions,
        name: 'admin',
        database: database,
    } as ConnectionOptions;
}

@Global()
@Module({})
export class DatabaseModule {
    static readonly logger = new Logger(DatabaseModule.name);

    static async init(entities: any[]): Promise<DynamicModule> {
        const entityMap = entities
            .map((e) => {
                const key = (e.name as string).replace('Entity', 's').toLowerCase();
                return {
                    [key]: e,
                };
            })
            .reduce((p, c) => ({ ...p, ...c }));
        console.log(entityMap);
        return {
            module: DatabaseModule,
            imports: [
                /**
                 * This database is not to be connected and there is no data in it.
                 */
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            ...commonConnectionOptions,
                            name: '<noConnection>',
                            database: TEMPLATE_DATABASE_NAME,
                            entities,
                            synchronize: true,
                            dropSchema: true,
                            keepConnectionAlive: false,
                        } as TypeOrmModuleOptions;
                    },
                }),

                /**
                 * This is the production database, whenever we run the application, new database created and the old data copied to the new one
                 */
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            ...commonConnectionOptions,
                            database: MAIN_DATABASE_NAME,
                            entities,
                            synchronize: true,
                            dropSchema: true,
                        } as TypeOrmModuleOptions;
                    },
                }),
            ],
            controllers: [ResourceController],
            providers: [
                DatabaseService,
                {
                    provide: DatabaseTokens.TEMPLATE_DB,
                    useValue: TEMPLATE_DATABASE_NAME,
                },

                {
                    inject: [REQUEST],
                    provide: DatabaseTokens.CLIENT_CONNECTION,
                    useFactory: async (req: Request) => {
                        const orgname = req.params.orgname;

                        if (!orgname) {
                            throw new NotFoundException(`Organization not found ${orgname}`);
                        }

                        try {
                            return getConnection(orgname);
                        } catch (err) {
                            return await createConnection({
                                ...commonConnectionOptions,
                                name: orgname,
                                entities,
                                database: orgname,
                            } as any);
                        }
                    },
                },
                {
                    inject: [REQUEST, DatabaseTokens.CLIENT_CONNECTION],
                    scope: Scope.REQUEST,
                    provide: DatabaseTokens.CLIENT_REPOSITORY,
                    useFactory: async (req: Request, con: Connection) => {
                        const resource = req.params.resource;
                        if (!resource) {
                            throw new NotFoundException(`Resource not found ${resource}`);
                        }
                        return con.getRepository(entityMap[resource]);
                    },
                },
            ],
            exports: [DatabaseService, ...values(DatabaseTokens)],
        };
    }
}
