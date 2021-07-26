import { Module } from '@nestjs/common';
import { CommonModules } from './app-common.module';

export const ADMIN_PROFILE = 'admin';

@Module({
  imports: [...CommonModules],
  controllers: [],
  providers: [],
})
export class AdminProfileModule {}
