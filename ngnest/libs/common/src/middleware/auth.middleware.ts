import { JwtService } from '@nestjs/jwt';
import { CookieEnum } from '@authdare/core';
import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  async use(req: Request, res: Response, next: () => void) {
    const loginCookie =
      req.cookies[CookieEnum.LOGIN_COOKIE] ||
      req.query[CookieEnum.LOGIN_COOKIE];
    try {
      const authUser = await this.jwt.verify(loginCookie);
      req['user'] = authUser;
    } catch (err) {
      req['user'] = null;
      // Authorization will happen in AuthGuard
    }

    next();
  }
}
