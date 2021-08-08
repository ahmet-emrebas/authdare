import { EmailService } from './email.service';
import { UserEntity } from './../user/entity/user.entity';
import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { message } from '@authdare/utils';
import { ForgotPasswordDTO } from './../user/dto/forgot-password.dto';
import { TokenStoreService } from './token-store.service';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ForgotPasswordService {
    private readonly logger = new Logger(ForgotPasswordService.name);
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
    async forgotPassword(body: ForgotPasswordDTO): Promise<{ message: string }> {
        const foundUser = await this.userService.isExistByEmail(body.email);

        if (!foundUser) throw new BadRequestException('Account does not exist!');

        if (body.code) {
            return await this.resetPassword(foundUser, body.code);
        }

        const token = await this.tokenStore.gen();

        await this.emailService.shortMessage({
            email: foundUser.email,
            title: 'Verification Code',
            message: `${token}`,
        });

        return await message(`Please follow the instruction in email sent by support@authdare.com`);
    }

    /**
     * Check the provided security code is valid or not.
     * If valid, then update the user password with new one, and send the password to the user via email.
     * @param user
     * @param code
     * @returns
     */
    async resetPassword(user: UserEntity, code: string): Promise<{ message: string }> {
        let newPassword = uuid();
        if (await this.tokenStore.verify(code)) {
            try {
                await this.userService.update(user.id, { password: newPassword });
            } catch (err) {
                this.logger.error(err);
                new InternalServerErrorException('We could not reset password for some reasons. Please try again.');
            }
            await this.emailService.shortMessage({ email: user.email, title: 'New Password', message: newPassword });
            return await message(`We sent your new password to your email, ${user.email}.`);
        }
        throw new BadRequestException('The code is not valid! Please request a new one!');
    }
}
