import { UserService } from './user/user.service';
import { SessionKeys } from './session-keys';
import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { message } from '@authdare/utils';
import { LoginDTO, LoginValidationPipe } from './user/dto/login.dto';
import {
    Controller,
    Post,
    Body,
    Session,
    Res,
    HttpStatus,
    NotAcceptableException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PublicPolicy } from './decorators';
import { Response } from 'express';
import { compare } from 'bcrypt';
import { Messages } from '@authdare/shared-code';

@Controller('auth')
export class LoginController {
    private readonly logger = new Logger(LoginController.name);
    constructor(private readonly userService: UserService) {}

    /**
     * @path /auth/login
     * @method POST
     * @param body LoginDTO
     * @param session Express Session
     * @returns
     */
    @PublicPolicy()
    @ApiNotAcceptableResponse({
        description: '(406) When password is wrong or input validation failed.',
    })
    @ApiNotFoundResponse({ description: '(404) When user does not exit.' })
    @ApiInternalServerErrorResponse({
        description: '(500) When server cannot operate for internal errors.',
    })
    @Post('login')
    async login(
        @Body(LoginValidationPipe) loginDTO: LoginDTO,
        @Session() session: any,
        @Res() res: Response,
    ) {
        let foundUser: UserEntity;

        try {
            foundUser = await this.userService.isExist({
                where: { email: loginDTO.email },
            });
        } catch (err) {
            throw new NotFoundException(Messages.EN.USER_NOT_FOUND);
        }

        const { password, ...withoutPassword } = foundUser;

        try {
            await compare(loginDTO.password, password);
            session[SessionKeys.USER] = withoutPassword;
            res.status(HttpStatus.OK);
            res.send(message('Welcome Back!'));
        } catch (err) {
            throw new NotAcceptableException(Messages.EN.WRONG_PASSWORD);
        }
    }
}
