import { CommonConstructor } from '@authdare/common/class';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/util';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';

export class ConfigModuleOptions extends CommonConstructor<ConfigModuleOptions> {
    type = 'postgres' as any;
    url = 'postgresql://postgres:password@localhost/config';
    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Global()
@Module({})
export class ConfigModule {
    static async configure(options?: Partial<ConfigModuleOptions>): Promise<DynamicModule> {
        const { type, url, providers, synchronize, dropSchema } = {
            ...new ConfigModuleOptions(),
            ...options,
        };

        return {
            module: ConfigModule,
            controllers: [ConfigController],
            providers: [
                ConfigService,
                ...ProvideRepositories({
                    name: 'e8006573-33fa-4d35-acf1-a6dc2a03f527',
                    url,
                    type,
                    entities: [ConfigEntity],
                    synchronize,
                    dropSchema,
                }),
                ...providers,
            ],
            exports: [ConfigService],
        };
    }
}
