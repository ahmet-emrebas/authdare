import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";
import { SqliteManagerService } from "./sqlite-manager.service";
import { CONNECTION_OPTIONS_TOKEN, DBManager, DB_MANAGER_TOKEN, ENTITIES_TOKEN } from './db-manager';

export interface DBManagerModuleOptions {
    connectionOptions: ConnectionOptions,
    managerService?: Type<DBManager<any>>
}

@Module({})
export class DBManagerModule {

    /**
     * The default ManagerService is SqliteManagerService
     * @param options 
     * @returns 
     */
    static register(options: DBManagerModuleOptions): DynamicModule {

        const managerService: Provider = {
            provide: DB_MANAGER_TOKEN,
            useClass: options.managerService || SqliteManagerService
        }

        const entitiesProvider = {
            provide: ENTITIES_TOKEN,
            useValue: options.connectionOptions.entities
        };

        const connectionOptionsPRovider = {
            provide: CONNECTION_OPTIONS_TOKEN,
            useValue: options
        }

        return {
            module: DBManagerModule,
            imports: [TypeOrmModule.forRoot(options.connectionOptions)],
            providers: [
                managerService,
                entitiesProvider,
                connectionOptionsPRovider
            ],
            exports: [
                managerService,
                entitiesProvider,
                connectionOptionsPRovider,

            ]
        }
    }
}