import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseManager, DATABASE_MANAGER_TOKEN, UserEntity, UserPermission } from '@authdare/models';
import { RESOURCE_SERVICE_KEY } from '@authdare/decorators';
import { HttpMethod, Cookies } from '@authdare/http';
import { ResourceService } from '@authdare/resources';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    @Inject(DATABASE_MANAGER_TOKEN) private readonly dbm: DatabaseManager<UserPermission>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest<Request>();
    const { resource } = req.params;
    const user = await this.verifyAuthToken(req);
    const orgname = user.orgname!;
    await this.checkUserHasRequiredPermissions(await this.requiredPermission(req), user);
    await this.setResourceService(req, orgname, resource);
    return true;
  }


  /**
   * Set resource service as property of Request.
   * @param req 
   * @param orgname 
   * @param resource 
   */
  async setResourceService(req: Request, orgname: string, resource: string) {
    (req as any)[RESOURCE_SERVICE_KEY] = await this.getResourceService(orgname, resource,);
  }

  /**
   * Determine the Required permission for the current request and create the instance of UserPermission class and return it.
   * @param param0
   * @returns UserPermission Object
   */
  async requiredPermission(req: Request): Promise<UserPermission> | never {
    const method = req.method as HttpMethod;
    const { resource } = req.params;
    const userInstance = new UserPermission(method, resource,);
    return await userInstance.validateAndTransformToClassInstance!();
  }

  /**
   * Check the user has the required permission or not
   * @param {UserPermission} requiredPermission
   * @param user
   * @returns {Promise<boolean> | never}
   * @throws {UnauthorizedException} if user does not have the required permission for this route.
   */
  async checkUserHasRequiredPermissions({ method, resource }: UserPermission, user: UserEntity,): Promise<void> | never {
    const foundPermission = user.permissions?.find(p => p.method == method && p.resource == resource);

    if (!foundPermission)
      throw new UnauthorizedException('You do not have sufficient permission for this request!');
  }

  /**
   * @param orgname 
   * @param resource 
   * @returns the resource service for the requested resource of the organization.
   */
  async getResourceService(orgname: string, resource: string) {
    const repo = await this.dbm.getRepositoryByOrgname({ orgname, resource });
    if (!repo) {
      throw new InternalServerErrorException(
        `Repository not found! , for "${resource}" and orgname "${orgname}"`,
      );
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
    const token = req.cookies[tokenKey];
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
