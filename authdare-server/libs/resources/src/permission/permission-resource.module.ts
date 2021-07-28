import { Module } from '@nestjs/common';
import { PermissionResourceController } from './permission-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from '@authdare/models';
import { JwtModule } from '@nestjs/jwt';
import { JWTModuleOptions } from '@authdare/auth';

@Module({
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  controllers: [PermissionResourceController],
})
export class PermissionResourceModule {
  static readonly className = 'PermissionResourceModule';
}
