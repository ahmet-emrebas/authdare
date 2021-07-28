import { AUTH_COOKIE } from './auth-cookie';
import { SignupDTO } from './dto';
import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthUserService } from "./auth-user.service";
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Auth")
@Controller("auth")
export class SignupController {
    constructor(private authService: AuthUserService) { }
    @Post("signup")
    async signup(@Body() signupDTO: SignupDTO, @Res() res: Response) {
        const token = await this.authService.signup(signupDTO);
        res.cookie(AUTH_COOKIE, token);
        res.send({ message: 'Welcome' })
    }
}