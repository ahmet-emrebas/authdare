import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { commonModules } from './common.modules';
import { ConnectionModule } from './connection.module';
import { DatabaseModule } from './database';

@Module({
    imports: [...commonModules(), ConnectionModule, DatabaseModule, AuthModule],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
