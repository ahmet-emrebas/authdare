import { ConnectionTokens } from '@authdare/common/db';
import { ConfigModule } from '@authdare/config';
import { EventModule } from '@authdare/event';
import { I18nModule } from '@authdare/i18n';
import { LogModule } from '@authdare/log';
import { MailModule } from '@authdare/mail';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth';
import { commonModules } from './common.modules';
import { ConnectionModule } from './connection.module';
import { DatabaseModule } from './database';

@Module({
    imports: [...commonModules(), ConnectionModule, DatabaseModule, AuthModule],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
