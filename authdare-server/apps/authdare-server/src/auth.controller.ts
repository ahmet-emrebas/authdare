
import { Cookies } from './http/cookies';
import { AuthService } from './auth.service';
import { Body, Controller, Param, Post, Res, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Login, UserEntity } from './models';
import { Response } from 'express';
import { orgConnection } from './utils';
import { JwtService } from '@nestjs/jwt';

@ApiTags("Auth")
@Controller('auth')
export class AuthControler {

    constructor(private readonly jwt: JwtService, private readonly authService: AuthService) { }

    @Post(':orgname/login')
    async clientLogin(@Body() body: Login, @Res() res: Response, @Param("orgname") orgname: string) {
        const clientUserRepo = await (await orgConnection(orgname)).getRepository(UserEntity);
        const clientService = new AuthService(this.jwt, clientUserRepo);
        const token = await clientService.login(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome!" });
    }

    @Post(':orgname/signup')
    async clientSignup(@Body() body: Login, @Res() res: Response, @Param("orgname") orgname: string) {
        const clientUserRepo = await (await orgConnection(orgname)).getRepository(UserEntity);
        const clientService = new AuthService(this.jwt, clientUserRepo);
        const token = await clientService.signup(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome!" });
    }




    @Post('login')
    async login(@Body() body: Login, @Res() res: Response) {
        const token = await this.authService.login(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome!" });
    }

    @Post('signup')
    async signup(@Body() body: UserEntity, @Res() res: Response) {
        const token = await this.authService.signup(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome!" });
    }
}