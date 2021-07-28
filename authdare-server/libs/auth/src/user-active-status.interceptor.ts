import { clearCookie, COOKIE_KEYS, setCookie, userToCookie } from './cookies';
import { getResourceService } from '@authdare/base';
import { UserEntity } from '@authdare/models';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

/**
 * Check the user active status, throw UnautorizedException if flase, or continue.
 */
@Injectable()
export class UserActiveStatusInterceptor implements NestInterceptor {

  constructor(private jwt: JwtService) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse<Response>();

    const user = req.user as UserEntity;
    if (user.active) {
      return next.handle();
    }

    const userService = await getResourceService<UserEntity>('users', user.org.name);

    const foundUser = await userService.findOne(user.id);

    if (foundUser?.active) {
      const token = await this.jwt.sign(userToCookie(foundUser));
      clearCookie(res, COOKIE_KEYS.AUTH_COOKIE);
      setCookie(res, COOKIE_KEYS.AUTH_COOKIE, token)
    } else {
      throw new UnauthorizedException('Your account is NOT active yet!')
    }

    return next.handle();
  }
}
