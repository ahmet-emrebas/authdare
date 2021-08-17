import { Module, Global, DynamicModule } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';
import { provideRepositories, ConnectionTokens } from '@authdare/common/db';

@Global()
@Module({})
export class LogModule {
    static configure(resourceType: ConnectionTokens): DynamicModule {
        return {
            module: LogModule,

            controllers: [LogController],
            providers: [...provideRepositories(resourceType, [LogEntity]), LogService],
            exports: [LogService],
        };
    }
}
