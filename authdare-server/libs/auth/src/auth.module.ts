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
import { JwtModule } from '@nestjs/jwt';
import { genSecret } from './gen-secret';
import {
  AuthUserResourceService,
  AUTH_USER_RESOURCE_SERVICE_TOKEN,
} from './auth-user-resource.service';

export interface AuthModuleOptions {
  userResouceService: Type<AuthUserResourceService>;
  signupService?: Type<AuthSignupService>;
  loginService?: Type<AuthLoginService>;

  /**
   * You can overrride the {AuthController}
   */
  authController?: Type<AuthController>;
  /**
   * You can override the default JwtModule
   */
  jwtModule?: DynamicModule;
  imports?: DynamicModule[];
}

const defaultJWTModule = JwtModule.registerAsync({
  useFactory: async () => {
    return {
      secret: await genSecret(),
    };
  },
});

/**
 * User resouce service must be provided, implement either ResouceService or from AuthUserResouceService. All Services and controllers can be overriden.
 */
@Module({})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      controllers: [options.authController || AuthController],
      imports: [options.jwtModule || defaultJWTModule, ...options.imports],
      providers: [
        {
          provide: AUTH_USER_RESOURCE_SERVICE_TOKEN,
          useClass: options.userResouceService,
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
