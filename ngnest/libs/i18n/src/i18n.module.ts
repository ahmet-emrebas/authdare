import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { ProvideRepositories, uuid } from '@authdare/common/util';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';

@Global()
@Module({})
export class I18nModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'i18n',
    ): Promise<DynamicModule> {
        return {
            module: I18nModule,
            controllers: [I18nKeyController, I18nValueController],

            providers: [
                I18nValueService,
                I18nKeyService,
                ...ProvideRepositories({
                    name: uuid(),
                    type,
                    url,
                    database,
                    entities: [I18nKeyEntity, I18nValueEntity],
                    synchronize: true,
                }),
            ],
            exports: [I18nValueService],
        };
    }
}
