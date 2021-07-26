import { AuthController } from './auth.controller';
import {
  AUTH_LOGIN_SERVICE_TOKEN,
  AuthLoginService,
} from './auth-login.service';
import {
  AUTH_SIGNUP_SERVICE_TOKEN,
  AuthSignupService,
} from './auth-signup.service';
import { Module, DynamicModule, Type } from '@nestjs/common';
import {
  AuthUserResourceService,
  AUTH_USER_RESOURCE_SERVICE_TOKEN,
} from './auth-user-resource.service';

export interface AuthModuleOptions {
  userResourceService: Type<AuthUserResourceService>;
  signupService?: Type<AuthSignupService>;
  loginService?: Type<AuthLoginService>;
  authController?: Type<AuthController>;
  jwtModule: DynamicModule;
  imports?: DynamicModule[];
}

/**
 * User resouce service must be provided, implement either ResouceService or from AuthUserResouceService. All Services and controllers can be overriden.
 */
@Module({})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {

    return {
      module: AuthModule,
      controllers: [options.authController || AuthController],
      imports: [
        options.jwtModule,
        ...options.imports],
      providers: [
        {
          provide: AUTH_USER_RESOURCE_SERVICE_TOKEN,
          useClass: options.userResourceService,
        },
        {
          provide: AUTH_LOGIN_SERVICE_TOKEN,
          useClass: options.loginService || AuthLoginService,
        },
        {
          provide: AUTH_SIGNUP_SERVICE_TOKEN,
          useClass: options.signupService || AuthSignupService,
        },
      ],

    };
  }
}
