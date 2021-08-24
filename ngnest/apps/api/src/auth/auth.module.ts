import { AuthController } from './auth.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConnectionTokens } from '@authdare/common/db';
import { SignupModule } from '@authdare/signup';

@Module({
    imports: [SignupModule.configure(ConnectionTokens.AUTH)],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
