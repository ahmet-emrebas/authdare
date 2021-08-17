import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConnectionModule } from '@authdare/common/db';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';

@Global()
@Module({})
export class ConfigModule {
    static configure(): DynamicModule {
        return {
            module: ConfigModule,
            imports: [ConnectionModule.configure('config', [ConfigEntity])],
            controllers: [ConfigController],
            providers: [ConfigService],
            exports: [ConfigService],
        };
    }
}
