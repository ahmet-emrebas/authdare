import { Module, Global, DynamicModule } from '@nestjs/common';
import { MailService, MailTemplateService } from './mail.service';
import { MailController } from './mail.controller';
import { MailEntity } from './mail.entity';
import { ConnectionModule } from '@authdare/common/db';
import { MailTemplatesEntity } from '.';
import { MailTemplateController } from './mail-template.controller';

@Global()
@Module({})
export class MailModule {
    static configure(): DynamicModule {
        return {
            module: MailModule,
            imports: [ConnectionModule.configure('mail', [MailEntity, MailTemplatesEntity])],
            controllers: [MailController, MailTemplateController],
            providers: [MailService, MailTemplateService],
            exports: [MailService, MailTemplateService],
        };
    }
}
