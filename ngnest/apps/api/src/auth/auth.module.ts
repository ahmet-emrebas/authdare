import { UserEntity } from '@authdare/models/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
