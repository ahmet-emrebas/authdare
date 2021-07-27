import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { COOKIE_LOGIN_KEY } from '@authdare/auth';
import { User } from '@authdare/models';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DBManager, DB_MANAGER_TOKEN, RESOURCE_SERVICE_KEY } from '@authdare/core';

export const USER_KEY = 'user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    @Inject(DB_MANAGER_TOKEN) private dbManager: DBManager
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest<Request>()
    const authToken = req.cookies[COOKIE_LOGIN_KEY];

    if (!authToken) {
      return false;
    }

    let verifiedUser: User;
    try {
      if (authToken) {
        verifiedUser = await this.jwt.verify<User>(authToken);
        req[USER_KEY] = verifiedUser;
      }
    } catch (err) {
      Logger.error(err);
    }

    const resourceName = req.path.split('/')[2];
    const orgname = verifiedUser?.org?.name;


    try {
      const service = await this.dbManager.resource({ orgname, resourceName });
      req[RESOURCE_SERVICE_KEY] = service;
    } catch (err) {
      Logger.error(err);
    }
    return true;
  }
}
