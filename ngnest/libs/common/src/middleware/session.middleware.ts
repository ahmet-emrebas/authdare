import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';

/**
 * Establish client session
 */
export class ClientSessionMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}
    use(req: any, res: any, next: () => void) {
        if (req.session) {
            console.log('There is session!');
        }

        throw new Error('Method not implemented.');
    }
}

/**
 * Establish public session middleware,
 * When end user does not have a session, the user is considered as public user.
 */
export class PublicSessionMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}
    use(req: any, res: any, next: () => void) {
        throw new Error('Method not implemented.');
    }
}
