import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

export const DEV_PROFILE = 'dev';

@Module({
  imports: [UserModule],
})
export class DevProfileModule { }
