import { Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {

    @Post('login')
    login(@Res() res: Response) {
        res.send({ message: " from auth controller " })
    }

    @Post('signup')
    signup(@Res() res: Response) {

        res.send({ message: " from auth controller " })
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.send({ message: " from auth controller " })
    }
}