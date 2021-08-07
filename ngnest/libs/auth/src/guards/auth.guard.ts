import { UserEntity } from './../user/entity/user.entity';
import { PolicyKeys } from './../decorators/policy-keys';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionKeys } from '../session-keys';

/**
 * Verify the user logged in or not.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PolicyKeys.PUBLIC, [context.getClass(), context.getHandler()]);
        if (isPublic) return true;

        const requiredPermission = this.reflector.getAllAndOverride(PolicyKeys.PERMISSION, [context.getClass(), context.getHandler()]);
        if (!requiredPermission) return true;

        const req = context.switchToHttp().getRequest<Request>();
        const session: any = req.session;
        const user = session[SessionKeys.USER] as UserEntity;

        if (!user) return false;

        const userPermissions = user?.permissions;

        if (userPermissions?.includes(requiredPermission)) {
            return true;
        }

        return false;
    }
}
