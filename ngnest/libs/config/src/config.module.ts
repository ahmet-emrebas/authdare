import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories, uuid, waitFor } from '@authdare/common/util';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';

@Global()
@Module({})
export class ConfigModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'config',
    ): Promise<DynamicModule> {
        return {
            module: ConfigModule,

            controllers: [ConfigController],
            providers: [
                ConfigService,
                ...ProvideRepositories({
                    name: uuid(),
                    url,
                    type,
                    database,
                    entities: [ConfigEntity],
                    synchronize: true,
                }),
            ],
            exports: [ConfigService],
        };
    }
}
