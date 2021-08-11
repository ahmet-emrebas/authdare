import { CommonConstructor } from '@authdare/common/class';
import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

class AuthConfig extends CommonConstructor<AuthConfig> {}

@Module({})
export class AuthModule {
    async configure(conf: AuthConfig): Promise<DynamicModule> {
        return {
            module: AuthModule,
            imports: [],
            controllers: [AuthController],
            providers: [AuthService],
        };
    }
}
