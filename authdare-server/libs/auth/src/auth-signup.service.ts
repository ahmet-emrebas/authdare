import {
  AuthUserResourceService,
  AUTH_USER_RESOURCE_SERVICE_TOKEN,
} from './auth-user-resource.service';
import { genToken } from '@authdare/common';
import { SignupService } from '@authdare/core';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
   * @param signupDto
   */
  async signup(signupDto: any): Promise<string> {
    const savedUser = await this.userService.save(signupDto);
    const token = this.jwt.sign(savedUser);
    return token;
  }
}
