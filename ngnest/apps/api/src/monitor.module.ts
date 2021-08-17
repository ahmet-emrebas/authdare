import { DebugModule } from '@authdare/common/filter';
import { ConfigModule } from '@authdare/config';
import { EventModule } from '@authdare/event';
import { I18nModule } from '@authdare/i18n';
import { LogModule } from '@authdare/log';
import { MailModule } from '@authdare/mail';
import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({ imports: [HttpModule], exports: [HttpModule] })
class GlobalHttpModule {}

@Module({
    imports: [
        GlobalHttpModule,
        DebugModule.configure(true),
        ConfigModule.configure(),
        LogModule.configure(),
        I18nModule.configure(),
        EventModule.configure(),
        MailModule.configure(),
    ],
})
export class MonitorModule {}
