import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthUser } from './entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUser])
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService,],
})
export class AuthUserModule { }
