import { OriginWhiteListMiddleware } from '@authdare/common/middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth';
import { commonModules } from './common.modules';
import { ConnectionModule } from './connection.module';
import { DatabaseModule } from './database';

@Module({
    imports: [...commonModules(), ConnectionModule, DatabaseModule, AuthModule],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                OriginWhiteListMiddleware([
                    'http://localhost:3000',
                    'https://authdare.com',
                    'https://aemrebas.com',
                ]),
            )
            .forRoutes('*');
    }
}
