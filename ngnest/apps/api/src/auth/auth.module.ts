import { CSRFGuard } from './csrf.guard';
import { AuthController } from './auth.controller';
import { uuid } from '@authdare/common/util';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
    controllers: [AuthController],
    imports: [JwtModule.register({ secret: uuid() })],
    providers: [CSRFGuard],
})
export class AuthModule {}
