import { importResourceModules } from '@authdare/utils/module';
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class ResouceModules {
    static async register(): Promise<DynamicModule> {
        const modules = (await importResourceModules());
        const imports = modules.map(e => e.module);
        const entities = modules.map(e => e.entity)
        const services = modules.map(e => e.service);
        return {
            module: ResouceModules,
            imports: [
                ...imports,
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            type: 'postgres',
                            host: 'localhost',
                            database: 'authdare',
                            username: 'postgres',
                            password: 'password',
                            entities: entities,
                            synchronize: true,
                            dropSchema: true,
                        };
                    },
                }),
                TypeOrmModule.forFeature(entities)
            ],
            providers: [...services],
            exports: [...services]
        }
    }
}