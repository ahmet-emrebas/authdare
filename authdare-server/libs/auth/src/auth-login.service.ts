import { pick } from 'lodash';
import {
  AuthUserResourceService,
  AUTH_USER_RESOURCE_SERVICE_TOKEN,
} from './auth-user-resource.service';
import { LoginCredentials, LoginService } from '@authdare/core';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { genToken } from '@authdare/common';
import { JwtService } from '@nestjs/jwt';

export const AUTH_LOGIN_SERVICE_TOKEN = genToken();


@Injectable()
export class AuthLoginService implements LoginService<LoginCredentials> {
  constructor(
    @Inject(AUTH_USER_RESOURCE_SERVICE_TOKEN)
    private readonly userService: AuthUserResourceService,
    private jwt: JwtService,
  ) { }
  async login(credentials: LoginCredentials): Promise<string> {
    const foundUser = await this.userService.findOne({
      where: { email: credentials.email },
    });
    if (!foundUser?.password) {
      throw new UnauthorizedException('Account not found!');
    }

    const isPasswordMatch = await compare(
      credentials.password,
      foundUser.password,
    );

    if (isPasswordMatch) {
      return this.jwt.sign(pick(foundUser, ['email', 'org.name', 'org.database']));
    }

    throw new UnauthorizedException('Password does not match!');
  }
}
