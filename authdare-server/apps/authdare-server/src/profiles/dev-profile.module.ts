import { Module } from '@nestjs/common';
import { CommonModules } from '../app-common.module';
import { UserController } from '../user';

export const DEV_PROFILE = 'dev';

@Module({
  imports: [
    ...CommonModules,
  ],
  controllers: [UserController]
})
export class DevProfileModule { }
