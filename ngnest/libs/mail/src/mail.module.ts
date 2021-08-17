import { Module, Global, DynamicModule } from '@nestjs/common';
import { MailService, MailTemplateService } from './mail.service';
import { MailController } from './mail.controller';
import { MailTemplateController } from './mail-template.controller';
import { ConnectionTokens, provideRepositories } from '@authdare/common/db';
import { MailEntity, MailTemplatesEntity } from './mail.entity';

@Global()
@Module({})
export class MailModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: MailModule,

            controllers: [MailController, MailTemplateController],
            providers: [
                ...provideRepositories(resourceType, [MailEntity, MailTemplatesEntity]),
                MailService,
                MailTemplateService,
            ],
            exports: [MailService, MailTemplateService],
        };
    }
}
