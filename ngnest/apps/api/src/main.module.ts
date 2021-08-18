import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { commonModules } from './common.modules';
import { ConnectionModule } from './connection.module';
import { DatabaseModule } from './database';

@Module({
    imports: [...commonModules(), ConnectionModule, DatabaseModule],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
