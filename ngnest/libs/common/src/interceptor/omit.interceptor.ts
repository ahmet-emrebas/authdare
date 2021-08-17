import { map, Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { isArray, omit } from 'lodash';

/**
 * When return data to the end user, sometimes we need to exclude some fields from the entity. Use this interceptor to omit fields from response body.
 * @param properties
 * @returns
 */
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
