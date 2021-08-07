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
        const req = context.switchToHttp().getRequest<Request>();
        const session: any = req.session;
        const authSession = session[SessionKeys.SESSION_KEY];
        if (authSession) {
            return true;
        }
        return false;
    }
}
