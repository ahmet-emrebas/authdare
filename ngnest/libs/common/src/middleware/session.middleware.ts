import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';
import { Request, Session } from '../interface';

/**
 * Establish client session by verifying each cookie and store them into request.userSession
 */
export class ClientSessionMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}
    use(req: Request, res: any, next: () => void) {
        if (req.parsedCookies) {
            const session = new Session(req.parsedCookies as any);

            console.log('There is no session!');
        }

        throw new Error('Method not implemented.');
    }
}

/**
 * Establish public session by giving a uuid to a public user.
 */
export class PublicSessionMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}
    use(req: any, res: any, next: () => void) {
        throw new Error('Method not implemented.');
    }
}
