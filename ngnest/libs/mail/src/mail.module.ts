import { Module, Global, DynamicModule } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailEntity, MailTemplatesEntity } from './mail.entity';
import { ProvideRepositories, uuid } from '@authdare/common/util';

@Global()
@Module({})
export class MailModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'mail',
    ): Promise<DynamicModule> {
        return {
            module: MailModule,
            controllers: [MailController],
            providers: [
                MailService,
                ...ProvideRepositories({
                    name: uuid(),
                    url,
                    type,
                    database,
                    entities: [MailEntity, MailTemplatesEntity],
                    synchronize: true,
                }),
            ],
            exports: [MailService],
        };
    }
}
