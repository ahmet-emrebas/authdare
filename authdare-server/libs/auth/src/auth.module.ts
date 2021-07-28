import { SignupController } from './signup.controller';
import { LoginController } from './login.controller';
import { OrgEntity, UserEntity } from '@authdare/models';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { AuthUserService } from './auth-user.service';

export const JWTModuleOptions = () => ({
  useFactory: async () => {
    const secret = process.env['SECRET'];
    if (isEmpty(secret)) Logger.warn('JWT secret is not found!', AuthModule.className)
    return {
      secret: process.env['SECRET'] || 'secret'
    };
  },
})

@Module({
  controllers: [
    LoginController,
    SignupController
  ],
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([UserEntity, OrgEntity])
  ],
  providers: [AuthUserService]
})
export class AuthModule {
  static readonly className = "AuthModule"

}
