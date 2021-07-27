import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

export const AUTH_COOKIE = 'auth_cookie';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()

    const authCookie = req.cookies[AUTH_COOKIE]
    const verifiedAuthCookie = await this.jwt.verify(authCookie)

    console.table({ authCookie, verifiedAuthCookie })

    return true;
  }
}
