import { Module, Global, DynamicModule } from '@nestjs/common';
import { ProvideRepositories, uuid } from '@authdare/common/util';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';

@Global()
@Module({})
export class LogModule {
    static async configure(
        type = 'postgres' as any,
        url = 'postgres://postgres:password@localhost',
        database = 'log',
    ): Promise<DynamicModule> {
        return {
            module: LogModule,
            controllers: [LogController],
            providers: [
                LogService,
                ...ProvideRepositories({
                    name: uuid(),
                    type,
                    url,
                    database,
                    entities: [LogEntity],
                    synchronize: true,
                    dropSchema: true,
                }),
            ],
            exports: [LogService],
        };
    }
}
