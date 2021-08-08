import { UserEntity } from './../user/entity/user.entity';
import { PolicyKeys } from './../decorators/policy-keys';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { SessionKeys } from '../session-keys';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    private logger = new Logger(AuthGuard.name);
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PolicyKeys.PUBLIC, [context.getClass(), context.getHandler()]);
        const req = context.switchToHttp().getRequest<Request>();
        const hostname = req.hostname;
        const originalUrl = req.originalUrl;
        const ip = req.ip;
        const url = req.url;
        const authorization = req.headers.authorization;
        console.table({ hostname, originalUrl, ip, url, authorization });

        /**
         * If is public then next
         */
        if (isPublic) {
            this.logger.log(`Public resource : ${isPublic}`);
            return true;
        }

        /**
         * NOT Public, then check the user has session or not
         */
        const session: any = req.session;
        const user = session[SessionKeys.USER] as UserEntity;
        if (!user) return false;

        /**
         * If User have session, then check there is any permission enforcement for the resource.
         */
        const requiredPermission = this.reflector.getAllAndOverride(PolicyKeys.PERMISSION, [context.getClass(), context.getHandler()]);
        const userPermissions = user?.permissions;
        if (!requiredPermission) return true;
        if (userPermissions?.includes(requiredPermission)) {
            return true;
        }

        /**
         * If user does not have permission return ForbiddenResourceException
         */

        return false;
    }
}
