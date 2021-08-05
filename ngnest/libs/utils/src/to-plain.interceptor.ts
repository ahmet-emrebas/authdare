import { CallHandler } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { classToPlain, ClassTransformOptions } from "class-transformer";
import { ExecutionContext, NestInterceptor } from '@nestjs/common';

export function ToplainInterceptor(options?: ClassTransformOptions) {
    return class ToplainInterceptorClass implements NestInterceptor {
        intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
            return next.handle().pipe(map((data: any[]) => {
                return data.map((e: any) => classToPlain(e, options));
            }))
        }
    }
}
