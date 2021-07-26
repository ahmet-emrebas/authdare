import { Logger } from '@nestjs/common';
import { User } from '@authdare/models';
import { COOKIE_LOGIN_KEY, Role } from '@authdare/auth';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { genToken } from '@authdare/common';
import { DBResourceManagerService, RESOURCE_SERVICE_KEY } from '@authdare/core';

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

    const authToken = req.cookies[COOKIE_LOGIN_KEY];
    let verifiedUser: User;

    try {
      if (authToken) {
        verifiedUser = await this.jwt.verify<User>(authToken);
        req[USER_RESOURCE_KEY] = verifiedUser;
      }
    } catch (err) {
      Logger.error(err);
    }

    const resourceName = req.params[0].split('/')[0];
    const orgName = verifiedUser?.org?.name;

    try {

      const service = await this.dbManager.resourceService(orgName, resourceName);
      req[RESOURCE_SERVICE_KEY] = service;
    } catch (err) {
      Logger.error(err);
    }
    next();
  }
}
