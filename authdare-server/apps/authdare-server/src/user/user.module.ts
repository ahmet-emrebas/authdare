import { ENTITIES_TOKEN } from '@authdare/core';
import { User } from '@authdare/models';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: ENTITIES_TOKEN,
      useValue: {
        'users': User
      }
    }
  ]
})
export class UserModule { }
