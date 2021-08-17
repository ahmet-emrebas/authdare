import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from './request';
import { DatabaseOptions } from './database-options';
import { UserDetails } from './user-details';

export interface IUserSession {
    uuid: string;
    lang: string;
    details: UserDetails;
    services: string[];
    permissions: string[];
    database: {
        eventDBConfig: DatabaseOptions;
        mailDBConfig: DatabaseOptions;
        logDBConfig: DatabaseOptions;
        configDBConfig: DatabaseOptions;
    };
}

/**
 * Decorator for getting user session data from context.
 * @returns RequestLocals
 */
export function UserSession(key?: keyof IUserSession) {
    return createParamDecorator((context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest<Request>();
        if (key) {
            return req.userSession[key];
        }
        return req.userSession;
    });
}
