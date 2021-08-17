import { I18nModule } from '@authdare/i18n';
import { LogModule } from '@authdare/log';
import { MailModule } from '@authdare/mail';
import { Module } from '@nestjs/common';
import { EventModule } from '@authdare/event';
import { ConnectionTokens } from '@authdare/common/db';
import { ConfigModule } from '@authdare/config';

@Module({
    imports: [
        ConfigModule.configure(ConnectionTokens.MONITOR),
        EventModule.configure(ConnectionTokens.MONITOR),
        MailModule.configure(ConnectionTokens.MONITOR),
        LogModule.configure(ConnectionTokens.MONITOR),
        I18nModule.configure(ConnectionTokens.MONITOR),
    ],
})
export class MonitorModule {}
