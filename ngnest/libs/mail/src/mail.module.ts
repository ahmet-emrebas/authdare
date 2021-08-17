import { ProvideRepositories } from '@authdare/common/db';
import { Module, Global, DynamicModule } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailEntity } from './mail.entity';

@Global()
@Module({})
export class MailModule {
    static configure(): DynamicModule {
        return {
            module: MailModule,
            controllers: [MailController],
            providers: [MailService, ...ProvideRepositories([MailEntity])],
            exports: [MailService],
        };
    }
}
