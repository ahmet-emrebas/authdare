import { snakeCase } from 'lodash';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from '../interface';

type TActionNames = 'query' | 'find' | 'save' | 'delete' | 'update';

/**
 * Parse metadata from context
 * @param context ExecutionContext
 * @returns
 */
function parseMetaData(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const lang = req.headers['accept-language']?.split(',')[0];
    const controllerClass = context.getClass();
    const { session, params, url, baseUrl, originalUrl } = req;
    const className = controllerClass.name;
    const handlerName = handler.name as TActionNames;
    const resourceName = snakeCase(className).split('_')[0];
    const user = (session as any)?.user;
    const orgname = user?.orgname;
    const requiredPermission = ` *${handlerName} *: *${resourceName}`;
    const permissionExp = new RegExp(requiredPermission, 'im');

    const metaData = {
        lang,
        className,
        resourceName,
        requiredPermission,
        handlerName,
        orgname,
        url,
        baseUrl,
        originalUrl,
        user,
        session,
        hasPermission: permissionExp.test(user?.permissions),
    };

    const userSession = req.userSession;

    console.table(metaData);
    return metaData;
}

/**
 * Only allow users with valid session
 */
@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const metaData = parseMetaData(context);
        const { user, ...rest } = metaData;
        const d = this.reflector.getAll(context.getClass().name, [context.getClass()]);
        console.table(metaData);

        return true;
    }
}
