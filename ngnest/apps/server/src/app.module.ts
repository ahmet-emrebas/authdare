import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModuleAdmin$ } from './app-db.module';
import { MailerModule$ } from './app-mail.module';
import { I18nModule$ } from './app-i18n.module';
import * as resources from '@resources';
import { AuthModule } from '@auth';
import { getModules } from '@base';
import { SampleMiddleware } from '@middlewares';

@Module({
  imports: [
    ...getModules(resources),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['api'],
    }),
    I18nModule$,
    MailerModule$,
    TypeOrmModuleAdmin$,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SampleMiddleware).forRoutes('**');
  }
}
