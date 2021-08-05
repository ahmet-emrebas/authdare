import { TaskEntity } from './task/entity/task.entity';
import { ClassConstructor } from 'class-transformer';
import { RESOURCE_ENTITY_CLASS_KEY, RESOURCE_REPO_KEY } from './resource.decorator';
import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { getRepositoryByOrgname } from '@authdare/utils';
import { SessionType } from '@authdare/auth/session';

@Injectable()
export class ResourceInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest<Request>();
        const entity: ClassConstructor<any> = this.reflector.getAllAndOverride(RESOURCE_ENTITY_CLASS_KEY,
            [
                context.getClass(),
                context.getHandler(),
            ]
        )

        const session = req.session as unknown as SessionType;
        const orgname = session.auth.orgname

        if (orgname) {
            const repository = await getRepositoryByOrgname(orgname, entity, [TaskEntity]);

            (req as any)[RESOURCE_REPO_KEY] = repository;
        }
        return next.handle()
    }

}