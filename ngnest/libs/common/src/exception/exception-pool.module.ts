import { Global, Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';

/**
 * Global Exception service that provides convinient methods to throw exceptions.
 */
@Global()
@Module({})
export class ExceptionPoolModule {
    static configure() {
        return {
            module: ExceptionPoolModule,
            providers: [ExceptionService],
            export: [ExceptionService],
        };
    }
}
