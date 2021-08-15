import { SubscriberEntity, ClientUserEntity } from '../models/user';
import { SubscribersController } from './subscribers.controller';
import { ResourceController } from './resource.controller';
import { REQUEST } from '@nestjs/core';
import { DatabaseTokens } from './database-tokens';
import { DatabaseService } from './database.service';
import {
    Module,
    Global,
    Scope,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
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

const entitiesMAP: { [name: string]: any } = {
    users: ClientUserEntity,
};

@Global()
@Module({
    imports: [
        /**
         * Subsriber database
         */
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    ...commonConnectionOptions,
                    name: MAIN_DATABASE_NAME,
                    database: MAIN_DATABASE_NAME,
                    entities: [SubscriberEntity],
                    synchronize: true,
                    dropSchema: true,
                } as TypeOrmModuleOptions;
            },
        }),
        TypeOrmModule.forFeature([SubscriberEntity]),
    ],
    controllers: [ResourceController, SubscribersController],
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
                    return null;
                }

                try {
                    return getConnection(orgname);
                } catch (err) {
                    return await createConnection({
                        ...commonConnectionOptions,
                        name: orgname,
                        entities: [ClientUserEntity],
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
                const orgname = req.params.orgname;
                if (!orgname) {
                    return null;
                }
                if (!resource) {
                    throw new NotFoundException(`Resource not found ${resource}`);
                }
                try {
                    return con.getRepository(entitiesMAP[resource]);
                } catch (err) {
                    console.error(err);
                    throw new InternalServerErrorException('Could not find the client repository!');
                }
            },
        },
    ],
    exports: [DatabaseService, ...values(DatabaseTokens)],
})
export class DatabaseModule {}
