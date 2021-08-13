import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function parseMetaData(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const _class = context.getClass();
    const { session, method, params } = req;
    const { orgname, resource } = params;
    const user = session?.user;

    const permissionExp = new RegExp(` *${method} *: *${resource}`, 'im');

    const metaData = {
        orgname,
        method,
        resource,
        handler: handler.name,
        _class: _class.name,
        user,
        session,
        hasPermission: permissionExp.test(user?.permissions),
    };
    return metaData;
}

/**
 * Check user has a valid session
 */
@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const metaData = parseMetaData(context);
        const { user, ...rest } = metaData;

        // console.table(user);
        // console.log(rest);
        return true;
    }
}
