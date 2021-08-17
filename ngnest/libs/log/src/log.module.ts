import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/db';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';

@Global()
@Module({})
export class LogModule {
    static configure(): DynamicModule {
        return {
            module: LogModule,
            controllers: [LogController],
            providers: [LogService, ...ProvideRepositories([LogEntity])],
            exports: [LogService],
        };
    }
}
