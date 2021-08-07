import { TokenStoreService } from './services/token-store.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { SignupService } from './services/signup.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './services/email.service';
import { AuthController } from './auth.controller';
import { CacheInterceptor, CacheModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { delay } from '@authdare/utils';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthCronService } from './services/auth-cron.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthDatabaseService } from './services/auth-database.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { TaskEntity } from '@authdare/resources/task';
import { ProviderTokens } from './provider-tokens';
import { LoginService } from './services/login.service';
import { CreateMemberService } from './services/create-member.service';

const EMAIL_HOST = 'mail.authdare.com';
const EMAIL_USERNAME = 'support@authdare.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'no password';

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
        JwtModule.register({ secret: hashSync(EMAIL_PASSWORD, genSaltSync(8)) }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                await delay(1000);
                return {
                    name: AuthModule.name,
                    type: 'sqlite',
                    database: 'database/auth/main.sqlite',
                    entities: [UserEntity, TaskEntity],
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
                        name: EMAIL_HOST,
                        host: EMAIL_HOST,
                        port: 465, // 587(no ssl)
                        auth: {
                            user: EMAIL_USERNAME,
                            pass: EMAIL_PASSWORD,
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    defaults: {
                        from: '"Authdare Support" <support@authdare.com>',
                    },
                    template: {
                        dir: join(__dirname, '../../mail/templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: false,
                        },
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        UserService,
        AuthCronService,
        EmailService,
        AuthDatabaseService,
        LoginService,
        SignupService,
        ForgotPasswordService,
        TokenStoreService,
        CreateMemberService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        {
            provide: ProviderTokens.RESOURCE_ENTITIES_TOKEN,
            useValue: [UserEntity, TaskEntity],
        },
    ],
})
export class AuthModule {
    private readonly logger = new Logger(AuthModule.name);
}
