import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/util';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ConfigEntity } from './config.entity';

@Global()
@Module({})
export class ConfigModule {
    /**
     *
     * @param iGetConnectionToken injectable token for implementaiton fo IGetConnection interface
     * @returns
     */
    static configure(): DynamicModule {
        return {
            module: ConfigModule,
            controllers: [ConfigController],
            providers: [ConfigService, ...ProvideRepositories([ConfigEntity])],
            exports: [ConfigService],
        };
    }
}
