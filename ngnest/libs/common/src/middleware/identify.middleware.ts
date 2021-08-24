import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { entries } from 'lodash';
import { Request } from '../interface';

@Injectable()
export class IdentifyMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) {}

    async use(req: Request, res: any, next: () => void) {
        const lang = req.headers['accept-language']?.split(',')[0]!;
        const cookies: Record<string, string> = req.cookies;
        let parsedCookies: Record<string, any> = {};

        parsingCookies: for (const [key, value] of entries(cookies)) {
            try {
                parsedCookies[key] = await this.jwt.verify(value);
            } catch (err) {
                next();
                break parsingCookies;
            }
        }

        next();
    }
}
