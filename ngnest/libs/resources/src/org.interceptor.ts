import { SessionKeys } from './../../auth/src/session-keys';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ReadFromOrgInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest<Request>();

        const user = (req.session as any)[SessionKeys.USER];

        return next
            .handle()
            .pipe(map((data) => data.filter((e: any) => e.orgname == user.orgname)));
    }
}

@Injectable()
export class WriteFromOrgInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest<Request>();

        const user = (req.session as any)[SessionKeys.USER];

        return next
            .handle()
            .pipe(map((data) => ({ ...data, orgname: user.orgname })));
    }
}
