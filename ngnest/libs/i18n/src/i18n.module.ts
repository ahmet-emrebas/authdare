import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { ProvideRepositories } from '@authdare/common/util';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';

@Global()
@Module({})
export class I18nModule {
    static configure(): DynamicModule {
        return {
            module: I18nModule,
            controllers: [I18nKeyController, I18nValueController],
            providers: [
                I18nValueService,
                I18nKeyService,
                ...ProvideRepositories([I18nKeyEntity, I18nValueEntity]),
            ],
            exports: [I18nValueService, I18nKeyService],
        };
    }
}
