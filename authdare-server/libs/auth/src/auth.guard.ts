import { AUTH_COOKIE } from './auth-cookie';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = req.cookies[AUTH_COOKIE];
    const verifiedUser = await this.jwt.verify(token);
    if (verifiedUser && verifiedUser.org.name) {
      req.user = verifiedUser;
    }
    return true;
  }
}
