import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
        return this.authService.getHello();
    }
}
