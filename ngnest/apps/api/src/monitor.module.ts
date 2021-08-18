import { I18nModule } from '@authdare/i18n';
import { LogModule } from '@authdare/log';
import { MailModule } from '@authdare/mail';
import { Module } from '@nestjs/common';
import { EventModule } from '@authdare/event';
import { ConnectionTokens } from '@authdare/common/db';
import { ConfigModule } from '@authdare/config';

@Module({
    imports: [],
})
export class MonitorModule {}
