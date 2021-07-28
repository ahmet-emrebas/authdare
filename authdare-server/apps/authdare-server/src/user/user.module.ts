import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JWTModuleOptions } from '@authdare/auth';
import { OrgEntity, UserEntity } from '@authdare/models';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([UserEntity, OrgEntity]),
  ],
  providers: [UserService],
})
export class UserModule {
  static readonly className = 'UserModule';
}
