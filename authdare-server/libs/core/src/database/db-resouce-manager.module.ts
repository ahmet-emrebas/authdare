import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";
import { CONNECTION_OPTIONS_TOKEN, DBResourceManagerService, ENTITIES_TOKEN } from "./db-resource-manager.service";


@Module({})
export class DBResourceManagerModule {
    static register(options: ConnectionOptions): DynamicModule {
        return {
            module: DBResourceManagerModule,
            imports: [TypeOrmModule.forRoot(options)],
            providers: [
                DBResourceManagerService,
                {
                    provide: ENTITIES_TOKEN,
                    useValue: options.entities
                },
                {
                    provide: CONNECTION_OPTIONS_TOKEN,
                    useValue: options
                }
            ],
            exports: [DBResourceManagerService, TypeOrmModule]
        }
    }
}