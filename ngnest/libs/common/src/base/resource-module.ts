import { ClassConstructor } from 'class-transformer';
import { Module, DynamicModule, Scope, Global } from '@nestjs/common';
import { EntitySchema, Connection } from 'typeorm';
import { ResourceService } from './resource.service';

@Global()
@Module({})
export class ResourceBuilderModule {
    static async configure(
        CONNECTION_TOKEN: string,
        entities: ClassConstructor<EntitySchema | any>[],
        controllers: ClassConstructor<any>[] = [],
    ): Promise<DynamicModule> {
        return {
            module: ResourceBuilderModule,
            controllers,
            providers: entities.map((entity) => {
                return {
                    inject: [CONNECTION_TOKEN],
                    scope: Scope.REQUEST,
                    provide: entity,
                    useFactory: async (con: Connection) => {
                        return new ResourceService(con.getRepository(entity));
                    },
                };
            }),
            exports: entities,
        };
    }
}
