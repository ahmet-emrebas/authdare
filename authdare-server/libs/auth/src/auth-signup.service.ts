import {
  AuthUserResourceService,
  AUTH_USER_RESOURCE_SERVICE_TOKEN,
} from './auth-user-resource.service';
import { genToken } from '@authdare/common';
import { SignupService } from '@authdare/core';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@authdare/models';
import { pick } from 'lodash';
export const AUTH_SIGNUP_SERVICE_TOKEN = genToken();

@Injectable()
export class AuthSignupService implements SignupService<any> {
  constructor(
    @Inject(AUTH_USER_RESOURCE_SERVICE_TOKEN)
    private readonly userService: AuthUserResourceService,
    private jwt: JwtService,
  ) {}

  /**
   * Create a new user and return the token
   * @param createUserDto
   */
  async signup(createUserDto: CreateUserDto): Promise<string> {
    const savedUser = await this.userService.save(createUserDto);
    const token = this.jwt.sign(pick(savedUser, ['email', 'org.name']));
    return token;
  }
}
