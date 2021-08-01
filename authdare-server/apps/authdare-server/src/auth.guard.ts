import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { UserEntity, UserPermission } from './models/user.entity';
import { Cookies } from './http/cookies';
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RESOURCE_SERVICE_KEY } from './decorators';
import { DatabaseManager, DATABASE_MANAGER_TOKEN } from './models/database';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwt: JwtService, @Inject(DATABASE_MANAGER_TOKEN) private readonly dbm: DatabaseManager<UserPermission>) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>();

    const { orgname, resource } = req.params;

    const user = await this.verifyAuthToken(req);

    await this.checkUserHasRequiredPermissions(await this.requiredPermission(req), user);

    req[RESOURCE_SERVICE_KEY] = await this.getResourceService(orgname, resource)

    return true;
  }

  /**
   * Determine the Required permission for the current request and create the instance of UserPermission class and return it.
   * @param param0 
   * @returns UserPermission Object
   */
  async requiredPermission({ method, params }: Request) {
    const { resource } = params;
    return await new UserPermission({ method, resource }).validateAndTransformToClassInstance();
  }

  /**
   * Check the user has the required permission or not
   * @param {UserPermission} requiredPermission  
   * @param user 
   * @returns {Promise<boolean> | never}
   * @throws {UnauthorizedException} if user does not have the required permission for this route.
   */
  async checkUserHasRequiredPermissions(requiredPermission: UserPermission, user: UserEntity): Promise<boolean> | never {
    if (user?.permissions?.find(e => e.method == requiredPermission.method)) {
      return true;
    } else {
      throw new UnauthorizedException('You do not have sufficient permission for this request!')
    }
  }

  async getResourceService(orgname: string, resource: string) {
    const repo = await this.dbm.getRepositoryByOrgname({ orgname, resource })
    if (!repo) {
      throw new InternalServerErrorException(`Repository not found! , for "${resource}" and orgname "${orgname}"`)
    }
    return new ResourceService(repo);
  }



  async verifyAuthToken(req: Request) {
    return await this.verifyToken(req, Cookies.AUTH);
  }

  /**
   * 
   * @param token 
   */
  async verifyToken(req: Request, tokenKey: Cookies): Promise<UserEntity> {
    const token = req.cookies[tokenKey]
    // Check auth cookie
    let user: UserEntity;
    try {
      user = await this.jwt.verify(token);
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();

    }
    return user;
  }


}
