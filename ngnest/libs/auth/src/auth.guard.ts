import { RolesManager } from './roles-manager';
import { Reflector } from '@nestjs/core';
import { getClientSession, SessionType } from './session';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { getAuthContext } from './set-roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authSession = getClientSession(context);
        const authContext = getAuthContext(context, this.reflector);

        if (authContext.isPublic) return true;

        if (!authSession) return false;

        const userRoles = authSession.roles;
        const hasRole = RolesManager.hasRoles(authContext.roles, userRoles);
        const hasPermission = RolesManager.hasPermissions(authContext.permissions, userRoles)

        return hasRole && hasPermission;
    }

}