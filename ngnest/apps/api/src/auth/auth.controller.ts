import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    @Post('login')
    login(@Res() res: Response) {
        res.send({
            message: 'Message there',
        });
    }

    @Post('signup')
    signup() {
        return { message: 'Mesasge ... ' };
    }

    @Post('logout')
    logout() {
        return { message: 'Mesasge ... ' };
    }

    @Post('forgot-password')
    forgotPassword() {
        return { message: 'Mesasge ... ' };
    }
}
