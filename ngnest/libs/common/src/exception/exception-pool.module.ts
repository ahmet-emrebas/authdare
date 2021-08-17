import { DynamicModule, Global, Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';

/**
 * Global Exception service that provides convinient methods to throw exceptions.
 */
@Global()
@Module({})
export class ExceptionPoolModule {
    static configure(): DynamicModule {
        return {
            module: ExceptionPoolModule,
            providers: [ExceptionService],
            exports: [ExceptionService],
        };
    }
}
