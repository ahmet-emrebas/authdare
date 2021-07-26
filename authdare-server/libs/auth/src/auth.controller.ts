import { LoginCredentials } from '@authdare/core';
import {
  AUTH_LOGIN_SERVICE_TOKEN,
  AuthLoginService,
} from './auth-login.service';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import {
  AUTH_SIGNUP_SERVICE_TOKEN,
  AuthSignupService,
} from './auth-signup.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

export const COOKIE_LOGIN_TOKEN = 'login_token';

@ApiTags('Default AuthController')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_LOGIN_SERVICE_TOKEN)
    private readonly loginService: AuthLoginService,
    @Inject(AUTH_SIGNUP_SERVICE_TOKEN)
    private readonly signupService: AuthSignupService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginCredentials, @Res() res: Response) {
    const token = await this.loginService.login(body);
    res.cookie(COOKIE_LOGIN_TOKEN, token);
    res.send({
      message: 'Welcome!',
    });
  }

  @Post('signup')
  async signup(@Body() body: any, @Res() res: Response) {
    const token = await this.signupService.signup(body);
    res.cookie(COOKIE_LOGIN_TOKEN, token);
    res.send({
      message: 'Welcome!',
    });
  }
}
