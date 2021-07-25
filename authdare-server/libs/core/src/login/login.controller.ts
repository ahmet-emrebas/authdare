import { LoginService, LOGIN_SERVICE_TOKEN } from './login.service';
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginCredentials } from './login-credentials';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("LoginController")
@Controller('login')
export class LoginController {
    constructor(@Inject(LOGIN_SERVICE_TOKEN) private readonly loginService: LoginService) { }

    @Post()
    async login(@Body() credentials: LoginCredentials) {
        const token = await this.loginService.login(credentials);
        return token;
    }
}