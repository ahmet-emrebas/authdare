import { AuthSignupService } from './auth-signup.service';
import { AuthLoginService } from './auth-login.service';
import { LoginModule, SignupModule } from '@authdare/core';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    LoginModule.register({ service: AuthLoginService }),
    SignupModule.register({ service: AuthSignupService })
  ]
})
export class AuthModule { }
