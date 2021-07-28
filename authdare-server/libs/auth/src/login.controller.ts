import { AUTH_COOKIE } from './auth-cookie';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthUserService } from './auth-user.service';
import { LoginDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * This login controller is for our own useage. Client will use the client-login-controller. 
 */
@ApiTags('Auth')
@Controller('authdare/auth')
export class LoginController {
  constructor(private authService: AuthUserService) { }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const token = await this.authService.login(loginDTO);
    res.cookie(AUTH_COOKIE, token);
    res.send({ message: 'Welcome Back!' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie(AUTH_COOKIE);
    res.send({ message: 'See you!' });
  }
}
