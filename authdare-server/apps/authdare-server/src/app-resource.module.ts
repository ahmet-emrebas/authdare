
import { AuthModule } from '@authdare/auth/auth.module';
import { AuthEntity } from '@authdare/auth/entities';
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
                AuthModule,
                ...imports,
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            type: 'postgres',
                            host: 'localhost',
                            database: 'authdare_client',
                            username: 'postgres',
                            password: 'password',
                            entities: [...entities, AuthEntity],
                            synchronize: true,
                            dropSchema: true,
                        };
                    },
                }),
                TypeOrmModule.forFeature([...entities, AuthEntity])
            ],
            providers: [...services],
            exports: [...services]
        }
    }
}