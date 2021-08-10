import { message } from '@authdare/utils';
import { UserEntity } from '@authdare/auth/user/entity/user.entity';
import { flatten, values } from 'lodash';
import { UserService } from './user/user.service';
import { ProviderTokens } from './provider-tokens';
import { EmailService } from './services/email.service';
import { SessionKeys } from './session-keys';
import { SignupDTO, SignupValidationPipe } from './user/dto/signup.dto';
import {
    Controller,
    Post,
    Body,
    Session,
    Inject,
    Logger,
    Res,
    ConflictException,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotAcceptableResponse,
} from '@nestjs/swagger';
import { PublicPolicy } from './decorators';
import { CreateUserDTO } from '.';
import { Response } from 'express';

type UserPermissions = {
    name: string;
    permissions: {
        get: string;
        post: string;
        patch: string;
        put: string;
        delete: string;
    };
}[];

@Controller('auth')
export class SignupController {
    private readonly logger = new Logger(SignupController.name);
    private readonly resourcePermissions: UserPermissions;

    constructor(
        @Inject(ProviderTokens.RESOURCE_PATHS) private readonly resourceNames: any[],
        private readonly userService: UserService,
        private emailService: EmailService,
    ) {
        this.resourcePermissions = this.resourceNames.map((e) => {
            return {
                name: e,
                permissions: {
                    get: `get:${e}`,
                    post: `post:${e}`,
                    patch: `patch:${e}`,
                    put: `put:${e}`,
                    delete: `delete:${e}`,
                },
            };
        });
    }

    /**
     * Signup
     * @param userdata
     * @param session
     * @returns
     */
    @ApiNotAcceptableResponse({ description: '(406) When input validation failed.' })
    @ApiConflictResponse({
        description:
            '(409) When database unique constraints fail or User already exists',
    })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @ApiCreatedResponse({ description: 'When user created/signed up' })
    @PublicPolicy()
    @Post('signup')
    async signup(
        @Body(SignupValidationPipe) userdata: SignupDTO,
        @Session() session: any,
        @Res() res: Response,
    ) {
        const orgname = userdata.orgname;

        let foundUser: UserEntity;
        try {
            foundUser = await this.userService.isExist({
                where: [{ orgname }, { email: userdata.email }],
            });
            throw new ConflictException('Account already exists!');
        } catch (err) {
            // Continue
        }

        const userPermissions = flatten(
            this.resourcePermissions.map((e) => {
                return values(e.permissions);
            }),
        );

        const { password, ...withoutPassword } = await this.userService.create(
            new CreateUserDTO({ ...userdata, permissions: userPermissions }),
        );

        session[SessionKeys.USER] = withoutPassword;

        await this.emailService.greeting(userdata.email);

        res.status(HttpStatus.CREATED);
        res.send(message('Welcome!'));
    }
}
