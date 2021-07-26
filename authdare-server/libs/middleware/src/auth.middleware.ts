import { Role } from '@authdare/auth';
import { RESOURCE_SERVICE_KEY } from '@authdare/core';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

/**
 * Name of the cookie saved to the client browser.
 */
export const AUTH_COOKIE = 'auth_cookie';

export interface AuthUserDetails {
  roles: Role[];
  orgname: string;
}

/**
 * The resouce service map {users:UserService, orgs:OrgService}
 */
export const RESOUCE_SERVICE_MAP_TOKEN = 'alskdfj90231j2n3';

/**
 * Only responsible for setting context variables.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    @Inject(RESOUCE_SERVICE_MAP_TOKEN)
    private readonly resourceServiceMap: { [key: string]: any },
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    if (!this.resourceServiceMap) {
      throw new Error('RESOUCE_SERVICE_MAP_TOKEN is not provided!');
    }

    const authToken = req.cookies[AUTH_COOKIE];
    try {
      const verifiedUser = await this.jwt.verify(authToken);
      req['user'] = verifiedUser;
    } catch (err) {
      // TODO: I will take care of the authentication in AuthGuard
    }

    /**
     * Extracting the resourcename from req.params like /api/users --> users with which the ResourceService is stored in the resourceServiceMap
     */
    const params = req.params[0].split('/');

    const resourceName = params && params[1];

    req[RESOURCE_SERVICE_KEY] = this.resourceServiceMap[resourceName];

    next();
  }
}
