import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global } from '@nestjs/common';
import { I18nService } from './i18n.service';
import { waitFor } from '@authdare/common/util';
import i18nUuid from './i18n.uuid';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                await waitFor(3000);
                return {
                    name: i18nUuid,
                    type: 'sqlite',
                    cache: {
                        duration: 1000 * 30,
                    },
                    database: './config/i18n.sqlite',
                    entities: [I18nKeyEntity, I18nValueEntity],
                    synchronize: true,
                    dropSchema: true,
                };
            },
        }),
        TypeOrmModule.forFeature([I18nKeyEntity, I18nValueEntity]),
    ],
    providers: [I18nService],
    exports: [I18nService],
})
export class I18nModule {}
