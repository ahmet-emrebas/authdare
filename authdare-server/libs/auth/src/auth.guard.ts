import { COOKIE_KEYS, getCookie } from './cookies';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authCookie = getCookie(req, COOKIE_KEYS.AUTH_COOKIE);
    try {
      const userAuthDetails = await this.jwt.verify(authCookie);
      req.user = userAuthDetails
    } catch (err) {
      throw new UnauthorizedException("You must login to access the resources!");
    }
    return true;
  }
}
