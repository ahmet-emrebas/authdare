import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/db';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';

@Global()
@Module({})
export class ConfigModule {
    static configure(): DynamicModule {
        return {
            module: ConfigModule,
            controllers: [ConfigController],
            providers: [ConfigService, ...ProvideRepositories([ConfigEntity])],
            exports: [ConfigService],
        };
    }
}
