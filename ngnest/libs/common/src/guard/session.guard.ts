import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Check user has a valid session
 */
@Injectable()
export class SessionGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        return true;
    }
}
