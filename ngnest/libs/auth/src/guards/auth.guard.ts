import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PolicyKey } from '@authdare/auth/policies';
import { IPermission } from '../policies/i-permission';
import { IDynamicPermission } from '../policies/i-dynamic-permission';
import { IRole } from '../policies/i-role';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const session = req.session;
        const getPolicy = <T>(key: string) => this.reflector.getAllAndOverride<T>(key, [context.getClass(), context.getHandler()]);

        const isPublicPolicy = getPolicy<boolean>(PolicyKey.PUBLIC);
        const isMemberPolicy = getPolicy<boolean>(PolicyKey.PUBLIC);
        const hasPermissionPolicy = getPolicy<IPermission[]>(PolicyKey.PERMISSION);
        const hasRolePolicy = getPolicy<IRole[]>(PolicyKey.ROLE);
        const hasDynamicPolicy = getPolicy<IDynamicPermission[]>(PolicyKey.DYNAMIC);


        return false;
    }

}