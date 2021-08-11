import { CommonConstructor } from '@authdare/common/class';
import { t } from '@authdare/common/type';
import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginForm extends CommonConstructor<LoginForm> {
    @ApiProperty() username = t<string>();
    @ApiProperty() password = t<string>();
}

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
        return this.authService.getHello();
    }

    @Post('login')
    login(@Body() loginForm: LoginForm, @Session() session: any) {}
}
