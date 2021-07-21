
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUser, AuthUserModule } from '@authdare/auth-user'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'databases/auth.sqlite',
      entities: [AuthUser],
      synchronize: true,
      dropSchema: true

    }),
    AuthUserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
