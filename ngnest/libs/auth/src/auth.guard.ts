import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { getClientSession } from './session';
import { RolesManager, getAuthContext } from './role';

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