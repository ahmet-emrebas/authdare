import { MonitorModule } from './monitor.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { commonModules } from './common.modules';
import { TestController } from './test.controller';
import { ResourceModule } from './resource.module';
import { ConnectionModule } from './connection.module';

@Module({
    controllers: [TestController],
    imports: [...commonModules(), ConnectionModule, MonitorModule, ResourceModule],
})
export class MainModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
