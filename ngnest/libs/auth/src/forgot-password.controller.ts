import { EmailService } from './services/email.service';
import { UserEntity } from './/user/entity/user.entity';
import {
    Body,
    Controller,
    HttpStatus,
    InternalServerErrorException,
    Logger,
    NotAcceptableException,
    NotFoundException,
    Post,
    Res,
} from '@nestjs/common';
import { message } from '@authdare/utils';
import {
    ForgotPasswordDTO,
    ForgotPasswordValidationPipe,
} from './user/dto/forgot-password.dto';
import { TokenStoreService } from './services/token-store.service';
import { UserService } from './user/user.service';
import { v4 as uuid } from 'uuid';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PublicPolicy } from './decorators';
import { Response } from 'express';

@Controller('auth')
export class ForgotPasswordController {
    private readonly logger = new Logger(ForgotPasswordController.name);
    constructor(
        private readonly tokenStore: TokenStoreService,
        private readonly userService: UserService,
        private readonly emailService: EmailService,
    ) {}

    /**
     * Check the user provided a verification code or send a new verification code.
     * If there is a verification code than run the resetPassword method
     * @param body
     * @returns
     */
    @ApiNotFoundResponse({ description: '(404) When user does not exit.' })
    @ApiInternalServerErrorResponse({
        description: '(500+) When server cannot operate for internal errors.',
    })
    @PublicPolicy()
    @Post('forgot-password')
    async forgotPassword(
        @Body(ForgotPasswordValidationPipe) body: ForgotPasswordDTO,
        @Res() res: Response,
    ) {
        let foundUser: UserEntity;

        try {
            foundUser = await this.userService.isExist({
                where: { email: body.email },
            });
        } catch (err) {
            this.logger.error(err);
            throw new NotFoundException('Account does not exist!');
        }

        if (body.code) {
            const __message = await this.resetPassword(foundUser, body.code);

            res.status(HttpStatus.OK);
            res.send(__message);
        }

        const token = this.tokenStore.gen();

        await this.emailService.shortMessage({
            email: foundUser.email,
            title: 'Verification Code',
            message: `${token}`,
        });
    }

    /**
     * Check the provided security code is valid or not.
     * If valid, then update the user password with new one, and send the password to the user via email.
     * @param user
     * @param code
     * @returns
     */
    async resetPassword(
        user: UserEntity,
        code: string,
    ): Promise<{ message: string }> {
        let newPassword = uuid();

        const isCodeValid = this.tokenStore.verify(code);

        if (isCodeValid) {
            try {
                await this.userService.update(user.id, { password: newPassword });
            } catch (err) {
                this.logger.error(err);
                throw new InternalServerErrorException(
                    'Could not reset the password at this time, please try again.',
                );
            }
            await this.emailService.shortMessage({
                email: user.email,
                title: 'New Password',
                message: newPassword,
            });

            return await message(`New password is sent to ${user.email}.`);
        } else {
            throw new NotAcceptableException('Invalid verification code');
        }
    }
}
