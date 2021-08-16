import { SubscriberEntity } from 'apps/api/src/models/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// @Module({
//     imports: [TypeOrmModule.forFeature([SubscriberEntity])],
//     providers: [AuthService],
//     controllers: [AuthController],
// })
// export class AuthModule {}
