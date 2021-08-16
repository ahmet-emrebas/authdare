import { CommonConstructor } from '@authdare/common/class';
import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { ProvideRepositories } from '@authdare/common/util';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';

export class I18nModuleOptions extends CommonConstructor<I18nModuleOptions> {
    type = 'postgres' as any;
    url = 'postgres://postgres:password@localhost';
    database = 'i18n';
    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Global()
@Module({})
export class I18nModule {
    static async configure(options?: Partial<I18nModuleOptions>): Promise<DynamicModule> {
        const { type, url, database, providers, synchronize, dropSchema } = {
            ...new I18nModuleOptions(),
            ...options,
        };
        return {
            module: I18nModule,
            controllers: [I18nKeyController, I18nValueController],
            providers: [
                I18nValueService,
                I18nKeyService,
                ...ProvideRepositories({
                    name: 'a295a448-0aaf-4210-9bb1-f656d42d12df',
                    type,
                    url,
                    database,
                    entities: [I18nKeyEntity, I18nValueEntity],
                    synchronize,
                    dropSchema,
                }),
                ...providers,
            ],
            exports: [I18nValueService],
        };
    }
}
