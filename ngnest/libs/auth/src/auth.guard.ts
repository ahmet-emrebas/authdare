import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { getClientSession } from './session';
import { RolesManager, getAuthContext } from './role';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authSession = await getClientSession(context);
        const authContext = getAuthContext(context, this.reflector);

        if (authContext.isPublic) return true;

        if (!authSession) return false;

        const userRoles = authSession.roles;
        const hasRole = RolesManager.hasRoles(authContext.roles, userRoles);
        const hasPermission = RolesManager.hasPermissions(authContext.permissions, userRoles)

        if (hasRole && hasPermission) {
            return true;
        }
        return false;
    }

}