import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';
import { provideRepositories, ConnectionTokens } from '@authdare/common/db';

@Global()
@Module({})
export class I18nModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: I18nModule,

            controllers: [I18nKeyController, I18nValueController],
            providers: [
                ...provideRepositories(resourceType, [I18nKeyEntity, I18nValueEntity]),
                I18nValueService,
                I18nKeyService,
            ],
            exports: [I18nValueService, I18nKeyService],
        };
    }
}
