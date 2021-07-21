import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ValidateDtoPipe } from '@pipes';
import { UserEntity } from '@resources';

import { Request, Response } from 'express';
import { AuthLoginDto } from './auth-login.dto';
import { AuthEnum } from './auth.enum';
import { AuthService } from './auth.service';

import { Public } from './public.decorator';
import { SignupDto } from './signup.dto';
import { GetUser } from './user.decorator';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailerService,
  ) {}

  @Get('unsubscribe')
  async unsubscribe(@GetUser() user: UserEntity, @Res() res: Response) {
    await this.authService.unsubscribe(user.id);

    res.clearCookie(AuthEnum.AUTH_COOKIE_NAME);
    res.send({ message: 'You unsubscribed!' });
  }

  @Public()
  @Post('signup')
  async signup(
    @Body(ValidateDtoPipe) user: SignupDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authToken = await this.authService.signup(user);
    const confirmationLink =
      'http://localhost:3000' +
      `/api/auth/verifyemail/?${AuthEnum.AUTH_COOKIE_NAME}=${authToken}`;

    await this.mailService.sendMail({
      from: 'security@authdare.com',
      to: user.email,
      subject: 'Email Confirmmation ✔', // Subject line
      template: './confirm-email',
      context: {
        link: confirmationLink,
      },
    });

    res.status(200);
    res.send({
      message: `Please check your inbox and click the confirmation link at ${user.email}`,
    });
  }

  @Get('verifyemail')
  verifyEmail(
    @Query(AuthEnum.AUTH_COOKIE_NAME) token: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.authService.verifyEmail(req['user'].email);
    res.cookie(AuthEnum.AUTH_COOKIE_NAME, token);
    res.redirect('/');
  }

  @Public()
  @ApiOkResponse({ description: 'Successfully logged in.' })
  @ApiUnprocessableEntityResponse({
    description: 'Email or password is not valid!',
  })
  @ApiUnauthorizedResponse({
    description: 'Email or password is not valid',
  })
  @Post('login')
  async login(
    @Body(ValidateDtoPipe) authLogin: AuthLoginDto,
    @Res() res: Response,
  ) {
    const authToken = await this.authService.login(authLogin);
    res.cookie(AuthEnum.AUTH_COOKIE_NAME, authToken);
    res.status(200);
    res.redirect('/');
  }
}
