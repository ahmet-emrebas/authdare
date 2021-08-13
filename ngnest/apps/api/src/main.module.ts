import { MainService } from './main.service';
import { AuthModule, AuthMaillerService } from './auth';
import { DatabaseModule } from './database';
import { entities } from '@authdare/models';
import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import loadConfig from './load-config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from '@authdare/common/guard';

const MaillerConfig = {
    EMAIL_TEMPLATE_PATH: join(__dirname, 'mail/templates'),
    EMAIL_HOST: 'mail.authdare.com',
    EMAIL_USERNAME: 'support@authdare.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'no password',
    EMAIL_DEFAULT_FROM: '"Authdare Support" <support@authdare.com>',
};

@Module({
    imports: [
        DatabaseModule.init(entities),
        EventEmitterModule.forRoot({
            global: true,
        }),
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [loadConfig],
        }),
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
    ],
    providers: [
        MainService,
        AuthMaillerService,
        {
            provide: APP_GUARD,
            useClass: SessionGuard,
        },
    ],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // TODO
    }
}
