import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ExceptionPoolModule } from '@authdare/common/exception';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const MaillerConfig = {
    EMAIL_TEMPLATE_PATH: join(__dirname, 'mail/templates'),
    EMAIL_HOST: 'mail.authdare.com',
    EMAIL_USERNAME: 'support@authdare.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'no password',
    EMAIL_DEFAULT_FROM: '"Authdare Support" <support@authdare.com>',
};

@Global()
@Module({ imports: [HttpModule], exports: [HttpModule] })
class GlobalHttpModule {}

export const commonModules = () => [
    GlobalHttpModule,
    ExceptionPoolModule.configure(),
    EventEmitterModule.forRoot({ global: true }),
    ScheduleModule.forRoot(),
    JwtModule.register({ secret: 'secret' }),

    ServeStaticModule.forRoot({
        rootPath: join(__dirname, 'public'),
        renderPath: '/',
        exclude: ['api', 'api/**/*'],
    }),
    MailerModule.forRootAsync({
        useFactory: () => {
            return {
                transport: {
                    name: MaillerConfig.EMAIL_HOST,
                    host: MaillerConfig.EMAIL_HOST,
                    port: 465, // 587(no ssl)
                    auth: {
                        user: MaillerConfig.EMAIL_USERNAME,
                        pass: MaillerConfig.EMAIL_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
                defaults: {
                    from: MaillerConfig.EMAIL_DEFAULT_FROM,
                },
                template: {
                    dir: MaillerConfig.EMAIL_TEMPLATE_PATH,
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            };
        },
    }),
];
