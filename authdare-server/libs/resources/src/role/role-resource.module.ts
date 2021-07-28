import { Module } from '@nestjs/common';
import { RoleResourceController } from './role-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@authdare/models';
import { JwtModule } from '@nestjs/jwt';
import { JWTModuleOptions } from '@authdare/auth';

@Module({
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [RoleResourceController],
})
export class RoleResourceModule {
  static readonly className = 'RoleResourceModule';
}
