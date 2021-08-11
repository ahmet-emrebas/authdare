import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
    static readonly title = AuthModule.name;
    static readonly description =
        'Provides authentication and autorization services';
    static readonly path = 'auth';
}
