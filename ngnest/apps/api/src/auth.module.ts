import { ConnectionTokens } from '@authdare/common/db';
import { SignupModule } from '@authdare/signup';
import { Module } from '@nestjs/common';

@Module({
    imports: [SignupModule.configure(ConnectionTokens.AUTH)],
})
export class AuthModule {}
