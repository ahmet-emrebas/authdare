import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConnectionModule } from '@authdare/common/db';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';

@Global()
@Module({})
export class LogModule {
    static configure(): DynamicModule {
        return {
            module: LogModule,
            imports: [ConnectionModule.configure('log', [LogEntity])],
            controllers: [LogController],
            providers: [LogService],
            exports: [LogService],
        };
    }
}
