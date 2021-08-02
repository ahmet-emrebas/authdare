import { AuthService } from './auth.service';
import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Login, UserEntity } from '@authdare/models';
import { Cookies } from '@authdare/http';

@ApiTags('Auth')
@Controller('auth')
export class AuthControler {
  constructor(private readonly jwt: JwtService, private readonly authService: AuthService) { }

  @Post(':orgname/login')
  async clientLogin(
    @Body() body: Login,
    @Res() res: Response,
    @Param('orgname') orgname: string,
  ) {
    const token = this.authService.login(body);
    res.cookie(Cookies.AUTH, token);
    res.send({ message: 'Welcome!' });
  }


  /**
   * Users join the organiations.
   * @param body
   * @param res
   * @param orgname
   */
  @Post(':orgname/join')
  async joinTeam(
    @Body() body: UserEntity,
    @Res() res: Response,
    @Param('orgname') orgname: string,
  ) {
    const token = await this.authService.join(body);
    res.cookie(Cookies.AUTH, token);
    res.send({
      message: 'Welcome, you are not given any permission yet!',
    });
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
    res.send({ message: 'Welcome!' });
  }
}
