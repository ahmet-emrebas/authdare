import { toPermissionString, toResourcePath } from '@base';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@resources';
import { Request } from 'express';
import { AuthEnum } from './auth.enum';
import { PUBLIC_DECORATOR } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string>(
      PUBLIC_DECORATOR,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;

    const authToken =
      (request.cookies && request.cookies[AuthEnum.AUTH_COOKIE_NAME]) ||
      request.query[AuthEnum.AUTH_COOKIE_NAME];

    const resouceName = toResourcePath(context.getClass());
    const requiredPermission = toPermissionString(method, resouceName);

    try {
      const user = this.jwt.verify<CreateUserDto>(authToken);
      request['user'] = user;
      if (
        user.permissions.includes('all') ||
        user.permissions.includes('admin') ||
        user.permissions.includes('king')
      ) {
        return true;
      }

      if (user.permissions.includes(requiredPermission)) {
        return true;
      } else {
        Logger.warn(
          `You do not have the permission ${requiredPermission} in your permission lis ${user.permissions}`,
          AuthGuard.name,
        );
        return false;
      }
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
