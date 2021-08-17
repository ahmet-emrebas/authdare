import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConnectionTokens, provideRepositories } from '@authdare/common/db';
import { ConfigEntity } from './config.entity';

@Global()
@Module({})
export class ConfigModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: ConfigModule,
            controllers: [ConfigController],
            providers: [...provideRepositories(resourceType, [ConfigEntity]), ConfigService],
            exports: [ConfigService],
        };
    }
}
