import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CSRFGuard } from './csrf.guard';

@UseGuards(CSRFGuard)
@Controller('auth')
export class AuthController {
    @Post('reset')
    reset() {
        return { statusCode: 200, message: 'Established secure connection' };
    }

    @Post('login')
    login(@Body() body: any) {
        return {
            statusCode: 200,
            message: 'You successfully logged in.',
        };
    }

    @Post('signup')
    signup(@Body() body: any) {
        return {
            statusCode: 400,
            message: 'Something went wrong',
        };
    }
}
