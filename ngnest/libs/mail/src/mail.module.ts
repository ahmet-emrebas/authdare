import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvideRepositories } from '@authdare/common/util';
import { CommonConstructor } from '@authdare/common/class';
import { MailTemplateController } from './mail-template.controller';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { MailService, MailTemplateService } from './mail.service';
import { MailController } from './mail.controller';
import { MailEntity, MailTemplatesEntity } from './mail.entity';

export class MailModuleOptions extends CommonConstructor<MailModuleOptions> {
    type = 'postgres' as any;
    url = 'postgres://postgres:password@localhost';
    database = 'i18n';
    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Global()
@Module({})
export class MailModule {
    static async configure(options?: Partial<MailModuleOptions>): Promise<DynamicModule> {
        const { type, url, database, providers, synchronize, dropSchema } = {
            ...new MailModuleOptions(),
            ...options,
        };
        return {
            module: MailModule,
            controllers: [MailController, MailTemplateController],
            providers: [
                MailService,
                MailTemplateService,
                ...ProvideRepositories({
                    name: 'b01c982e-ad85-4359-8d5e-8762bcfac0b2',
                    type,
                    url,
                    database,
                    entities: [MailEntity, MailTemplatesEntity],
                    synchronize,
                    dropSchema,
                }),
                ...providers,
            ],
            exports: [MailService, MailTemplateService],
        };
    }
}
