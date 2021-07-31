
import { Cookies } from './http';
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

    /**
     * Users join the organiations.
     * @param body 
     * @param res 
     * @param orgname 
     */
    @Post(':orgname/join')
    async clientSignup(@Body() body: UserEntity, @Res() res: Response, @Param("orgname") orgname: string) {
        const clientUserRepo = await (await orgConnection(orgname)).getRepository(UserEntity);
        const clientService = new AuthService(this.jwt, clientUserRepo);
        const token = await clientService.join(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome, your account need an approval from the admin of your organization." });
    }


    /**
     * This is for subscription
     * @param body 
     * @param res 
     */
    @Post('signup')
    async signup(@Body() body: UserEntity, @Res() res: Response) {
        const token = await this.authService.signup(body);
        res.cookie(Cookies.AUTH, token);
        res.send({ message: "Welcome!" });
    }



}