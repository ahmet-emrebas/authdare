import { map, Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { isArray, omit } from 'lodash';

export const OmitInterceptor = (...properties: string[]) =>
    class OmitInterceptorClass implements NestInterceptor {
        intercept(
            context: ExecutionContext,
            next: CallHandler<any>,
        ): Observable<any> | Promise<Observable<any>> {
            return next.handle().pipe(
                map((data) => {
                    if (isArray(data)) {
                        return data.map((e) => omit(e, properties));
                    }
                    return omit(data, properties);
                }),
            );
        }
    };
