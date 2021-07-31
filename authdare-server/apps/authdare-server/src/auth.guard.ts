import { ResourceService } from './resource.service';
import { UserEntity } from './models/user.entity';
import { Cookies } from './http/cookies';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { getOrgRepository } from './utils';
import { RESOURCE_SERVICE_KEY } from './decorators/get-resource-service.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwt: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const authCookie = req.cookies[Cookies.AUTH];
    const { resource } = req.params;


    // Check auth cookie
    let user: UserEntity;
    try {
      user = await this.jwt.verify(authCookie);
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();

    }


    // required permissions
    const requiredPermission = `${user.orgname}:${method}:${resource}`.toLowerCase().replace(" ", "");

    // check permissions
    if (user?.permissions?.includes(requiredPermission)) {

      const repo = await getOrgRepository({ orgname: user.orgname, resource });

      const resourceService = new ResourceService(repo);
      //  Inject the ResourceSErvice 
      req[RESOURCE_SERVICE_KEY] = resourceService;


      return true;
    }


    throw new UnauthorizedException(`You do not have the permission,  ${requiredPermission}!`);
  }



}
