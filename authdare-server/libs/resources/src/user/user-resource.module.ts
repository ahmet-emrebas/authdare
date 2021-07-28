import { Module } from '@nestjs/common';
import { UserResourceController } from './user-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@authdare/models';
import { JwtModule } from '@nestjs/jwt';
import { JWTModuleOptions } from '@authdare/auth';

@Module({
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserResourceController],
})
export class UserResourceModule {
  static readonly className = 'UserResourceModule';
}
