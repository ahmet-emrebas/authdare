import { AuthControler } from '@authdare/auth';
import { DynamicModule, Module, ModuleMetadata } from "@nestjs/common";
import { AuthService } from './auth.service';

export const PUBLIC_RESOURCES_KEY = 'PUBLIC_RESOURCES_KEY'

@Module({})
export class AuthModule {
    static register(options: ModuleMetadata): DynamicModule {
        return {
            module: AuthModule,
            imports: options.imports,
            controllers: [AuthControler],
            providers: [
                ...options.providers!,
                AuthService
            ],
        }
    }
}