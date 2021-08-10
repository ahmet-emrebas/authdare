import { TokenStoreService } from './services/token-store.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './services/email.service';
import { AuthController } from './auth.controller';
import { CacheInterceptor, CacheModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { delay, ImObject } from '@authdare/utils';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthCronService } from './services/auth-cron.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { TaskEntity } from '@authdare/resources/task';
import { ProviderTokens } from './provider-tokens';
import { v4 } from 'uuid';
import { SignupController } from './signup.controller';
import { LoginController } from './login.controller';
import { ForgotPasswordController } from './forgot-password.controller';

const Config = ImObject({
    // Email
    EMAIL_TEMPLATE_PATH: join(__dirname, 'mail/templates'),
    EMAIL_HOST: 'mail.authdare.com',
    EMAIL_USERNAME: 'support@authdare.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'no password',
    EMAIL_DEFAULT_FROM: '"Authdare Support" <support@authdare.com>',

    // Database
    DB_TYPE: 'sqlite',
    DB_URL: 'database/auth/main.sqlite',
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    ENTITIES: [UserEntity, TaskEntity],

    // JWT
    SECRET: process.env.SECRET || v4(),
});

@Module({
    imports: [
        ConfigModule.forRoot(),
        EventEmitterModule.forRoot({
            // set this to `true` to use wildcards
            wildcard: true,
            // the delimiter used to segment namespaces
            delimiter: '.',
            // set this to `true` if you want to emit the newListener event
            newListener: false,
            // set this to `true` if you want to emit the removeListener event
            removeListener: false,
            // the maximum amount of listeners that can be assigned to an event
            maxListeners: 10,
            // show event name in memory leak message when more than maximum amount of listeners is assigned
            verboseMemoryLeak: false,
            // disable throwing uncaughtException if an error event is emitted and it has no listeners
            ignoreErrors: false,
        }),
        CacheModule.register({
            ttl: 10,
            max: 20,
        }),
        ScheduleModule.forRoot(),
        JwtModule.register({ secret: Config.SECRET }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                await delay(1000);
                return {
                    name: AuthModule.name,
                    type: Config.DB_TYPE as any,
                    database: Config.DB_URL,
                    entities: Config.ENTITIES,
                    synchronize: true,
                    dropSchema: true,
                };
            },
        }),
        TypeOrmModule.forFeature([UserEntity, TaskEntity]),

        MailerModule.forRootAsync({
            useFactory: () => {
                return {
                    transport: {
                        name: Config.EMAIL_HOST,
                        host: Config.EMAIL_HOST,
                        port: 465, // 587(no ssl)
                        auth: {
                            user: Config.EMAIL_USERNAME,
                            pass: Config.EMAIL_PASSWORD,
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    defaults: {
                        from: Config.EMAIL_DEFAULT_FROM,
                    },
                    template: {
                        dir: Config.EMAIL_TEMPLATE_PATH,
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: false,
                        },
                    },
                };
            },
        }),
    ],
    controllers: [
        AuthController,
        SignupController,
        LoginController,
        ForgotPasswordController,
    ],
    providers: [
        UserService,
        AuthCronService,
        EmailService,
        TokenStoreService,
        UserService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        {
            provide: ProviderTokens.RESOURCE_ENTITIES_TOKEN,
            useValue: [UserEntity, TaskEntity],
        },

        {
            provide: ProviderTokens.RESOURCE_PATHS,
            useValue: ['users', 'tasks'],
        },
    ],
})
export class AuthModule {
    private readonly logger = new Logger(AuthModule.name);
}
