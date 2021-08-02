import { AuthControler, AuthService } from '@authdare/auth';
import { Module } from "@nestjs/common";

@Module({
    controllers: [AuthControler],
    providers: [AuthService]
})
export class AuthModule {

}