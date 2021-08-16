import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { DatabaseOptions } from './database-options';
import { UserDetails } from './user-details';

export interface IUserSession {
    uuid: string;
    userDetails: UserDetails;
    organization: string;
    services: string[];
    permissions: string[];
    eventDBConfig: DatabaseOptions;
    mailDBConfig: DatabaseOptions;
    logDBConfig: DatabaseOptions;
    configDBConfig: DatabaseOptions;
}

/**
 * Get RequestLocals from context
 * @returns RequestLocals
 */
function UserSession(key?: keyof IUserSession) {
    return createParamDecorator((context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest<Request>();
        if (key) {
            return req.session[key];
        }
        return req.session;
    });
}
