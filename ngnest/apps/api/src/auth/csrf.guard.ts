import { uuid } from '@authdare/common/util';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

const CSRF_NAME = 'csrf';

@Injectable()
export class CSRFGuard implements CanActivate {
    constructor(private jwt: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const res = context.switchToHttp().getResponse<Response>();
        const req = context.switchToHttp().getRequest<Request>();

        const _old_csrf = req.cookies[CSRF_NAME];
        const _new_csrf = this.jwt.sign({ a: uuid() }, { expiresIn: 60 });

        try {
            this.jwt.verify(_old_csrf);
        } catch (err) {
            res.cookie(CSRF_NAME, _new_csrf);
            throw new UnauthorizedException('Request from different origins are not allowed!');
        }

        res.cookie(CSRF_NAME, _new_csrf);

        return true;
    }
}
