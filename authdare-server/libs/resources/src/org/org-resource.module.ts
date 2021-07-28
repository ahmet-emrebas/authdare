import { Module } from '@nestjs/common';
import { OrgResourceController } from './org-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgEntity } from '@authdare/models';
import { JwtModule } from '@nestjs/jwt';
import { JWTModuleOptions } from '@authdare/auth';

@Module({
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([OrgEntity]),
  ],
  controllers: [OrgResourceController],
})
export class OrgResourceModule {
  static readonly className = 'OrgResourceModule';
}
