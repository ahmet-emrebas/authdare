import { Module } from '@nestjs/common';
import { TaskResourceController } from './task-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@authdare/models';
import { JwtModule } from '@nestjs/jwt';
import { JWTModuleOptions } from '@authdare/auth';

@Module({
  imports: [
    JwtModule.registerAsync(JWTModuleOptions()),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskResourceController],
})
export class TaskResourceModule {
  static readonly className = 'TaskResourceModule';
}
