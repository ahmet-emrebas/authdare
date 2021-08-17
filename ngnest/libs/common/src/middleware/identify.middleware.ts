import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from '../interface';

/**
 * Request session holds only the uuid of the user.
 */
export class IdentifyMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}
    use(req: Request, res: any, next: () => void) {
        const lang = req.headers['accept-language']?.split(',')[0]!;
        const session = req.session;

        next();
    }
}
