import { DynamicModule, Module } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ExternalConnectionProvider, CONNECTION } from './external-connection.provider';
import { SessionDatabase } from '../interface';

@Module({})
export class ConnectionModule {
    static async configure(
        moduleDB: keyof SessionDatabase,
        entities: ClassConstructor<any>[],
    ): Promise<DynamicModule> {
        return {
            module: ConnectionModule,
            providers: [ExternalConnectionProvider(moduleDB, entities)],
            exports: [CONNECTION],
        };
    }
}
