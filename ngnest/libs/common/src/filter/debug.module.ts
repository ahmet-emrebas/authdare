import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { t } from '@authdare/common/type';
import { DebugExceptionFilter } from './debug.filter';

@Global()
@Module({})
export class DebugModule {
    static configure(active: boolean): DynamicModule {
        return {
            module: DebugExceptionFilter,
            providers: [
                {
                    provide: APP_FILTER,
                    useClass: active ? DebugExceptionFilter : t<any>(undefined),
                },
            ],
        };
    }
}
