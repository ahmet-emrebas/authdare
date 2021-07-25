import { SignupService, SIGNUP_SERVICE_TOKEN } from './signup.service';
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignupCredentials } from './signup.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("SignupController")
@Controller('signup')
export class SignupController {
    constructor(@Inject(SIGNUP_SERVICE_TOKEN) private readonly signupService: SignupService) { }

    @Post()
    async signup(@Body() credentials: SignupCredentials) {
        const token = await this.signupService.signup(credentials);
        return token;
    }
}