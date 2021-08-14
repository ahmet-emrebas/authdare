import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { Module, Global } from '@nestjs/common';
import { I18nValueService, I18nKeyService } from './i18n.service';
import { ProvideRepositories } from '@authdare/common/util';
import { I18nKeyController } from './i18n-key.controller';
import { I18nValueController } from './i18n-value.controller';
import { v4 } from 'uuid';

@Global()
@Module({
    controllers: [I18nKeyController, I18nValueController],

    providers: [
        I18nValueService,
        I18nKeyService,
        ...ProvideRepositories({
            name: v4(),
            type: 'sqlite',
            entities: [I18nKeyEntity, I18nValueEntity],
            database: './i18n/i18n.sqlite',
            synchronize: true,
            dropSchema: true,
        }),
    ],
    exports: [I18nValueService],
})
export class I18nModule {}
