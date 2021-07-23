import { CreateUserDto } from '@authdare/models';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '@authdare/common';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const user: CreateUserDto = req['user'] as CreateUserDto;
    const method = req.method;
    const resource = context.getClass().name;
    console.log(user, method, resource);

    return true;
  }
}
