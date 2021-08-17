import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { ConnectionModule } from '@authdare/common/db';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';

@Global()
@Module({})
export class I18nModule {
    static configure(): DynamicModule {
        return {
            module: I18nModule,
            imports: [ConnectionModule.configure('i18n', [I18nKeyEntity, I18nValueEntity])],
            controllers: [I18nKeyController, I18nValueController],
            providers: [I18nValueService, I18nKeyService],
            exports: [I18nValueService, I18nKeyService],
        };
    }
}
