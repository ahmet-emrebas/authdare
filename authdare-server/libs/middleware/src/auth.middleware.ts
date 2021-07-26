import { User } from '@authdare/models';
import { Role } from '@authdare/auth';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { genToken } from '@authdare/common';
import { DBResourceManagerService } from '@authdare/core';

/**
 * Name of the cookie saved to the client browser.
 */
export const AUTH_COOKIE = 'auth_cookie';

export interface AuthUserDetails {
  roles: Role[];
  orgname: string;
}


export const USER_RESOURCE_KEY = genToken();


/**
 * Only responsible for setting request variables like user and organization
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private dbManager: DBResourceManagerService
  ) { }

  async use(req: Request, res: Response, next: () => void) {

    const authToken = req.cookies[AUTH_COOKIE];
    let verifiedUser: User;
    try {
      verifiedUser = await this.jwt.verify<User>(authToken);
      req[USER_RESOURCE_KEY] = verifiedUser;
    } catch (err) {
      next();
    }

    /**
     * Extracting the resourcename from req.params like /api/users --> users with which the ResourceService is stored in the resourceServiceMap
     */
    const params = req.params[0].split('/');
    const resourceName = params && params[1];
    const orgName = verifiedUser?.org?.name;
    console.log('ResouceName:', resourceName, __dirname);
    console.log('Organization:', orgName)

    this.dbManager.resourceService(orgName, resourceName);
    next();
  }
}
