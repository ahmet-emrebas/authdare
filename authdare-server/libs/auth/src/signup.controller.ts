import { COOKIE_KEYS, setCookie } from './cookies';
import { SignupDTO } from './dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


/**
 * This SignUP controller  is for Client Useage. It makes sense because we do not need to subscribe our own application right. :)
 */
@ApiTags('Auth')
@Controller('authdare/auth')
export class SignupController {
  constructor(private authService: AuthUserService) { }
  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO, @Res() res: Response) {
    const token = await this.authService.signup(signupDTO);
    setCookie(res, COOKIE_KEYS.AUTH_COOKIE, token);
    res.send({ message: 'Welcome' });
  }
}
