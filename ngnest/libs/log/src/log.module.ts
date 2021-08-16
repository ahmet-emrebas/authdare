import { CommonConstructor } from '@authdare/common/class';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { ProvideRepositories } from '@authdare/common/util';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';

export class LoggerModuleOptions extends CommonConstructor<LoggerModuleOptions> {
    type = 'postgres' as any;
    url = 'postgres://postgres:password@localhost';
    database = 'log';
    providers: Provider<any>[] = [];
    synchronize = true;
    dropSchema = false;
}

@Global()
@Module({})
export class LogModule {
    static async configure(options?: Partial<LoggerModuleOptions>): Promise<DynamicModule> {
        const { type, url, database, providers, synchronize, dropSchema } = {
            ...new LoggerModuleOptions(),
            ...options,
        };

        return {
            module: LogModule,
            controllers: [LogController],
            providers: [
                LogService,
                ...ProvideRepositories({
                    name: '9b568321-bf9a-4109-b671-3549166b174f',
                    type,
                    url,
                    database,
                    entities: [LogEntity],
                    synchronize,
                    dropSchema,
                }),
                ...providers,
            ],
            exports: [LogService],
        };
    }
}
