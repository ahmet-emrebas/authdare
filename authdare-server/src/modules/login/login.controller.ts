import { LoginService } from './login.service';
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginCredentialsDto } from './log-credentials';

export const LOGIN_SERVICE_TOKEN = 'LoginService_001';

@Controller('login')
export class LoginController {
    constructor(@Inject(LOGIN_SERVICE_TOKEN) private readonly loginService: LoginService) { }

    @Post()
    async login(@Body() credentials: LoginCredentialsDto) {
        const token = await this.loginService.login(credentials);
        return token;
    }
}