import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const session = req.session;
        const isPublic = this.reflector.getAllAndOverride()


        const authSession = null//await getClientSession(context);
        const authContext = getAuthContext(context, this.reflector);

        if (authContext.isPublic) return true;

        if (!authSession) return false;

        const userRoles = (authSession as).roles;
        const hasRole = RolesManager.hasRoles(authContext.roles, userRoles);
        const hasPermission = RolesManager.hasPermissions(authContext.permissions, userRoles)

        if (hasRole && hasPermission) {
            return true;
        }
        return false;
    }

}