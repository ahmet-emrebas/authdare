import { Module } from '@nestjs/common';
import { UserResourceController } from './user-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@authdare/models';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserResourceController],
})
export class UserResourceModule {
  static className = 'UserResourceModule'
}
