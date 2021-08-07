import { UserEntity } from './../user/entity/user.entity';
import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { message } from '@authdare/utils';
import { ForgotPasswordDTO } from './../user/dto/forgot-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TokenStoreService } from './token-store.service';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EmailEvents } from '.';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ForgotPasswordService {
    private readonly logger = new Logger(ForgotPasswordService.name);
    constructor(
        private readonly tokenStore: TokenStoreService,
        private readonly userService: UserService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async forgotPassword(body: ForgotPasswordDTO): Promise<{ message: string }> {
        const foundUser = await this.userService.isExistByEmail(body.email);

        if (!foundUser) throw new BadRequestException('Account does not exist!');

        if (body.code) {
            return await this.resetPassword(foundUser, body.code);
        }

        const token = await this.tokenStore.gen();

        this.eventEmitter.emit(EmailEvents.FORGOT_PASSWORD, {
            email: body.email,
            message: `
            We just received a password-reset request. If it was you, type this code, "${token}"  to the secret field and click the reset-password button.
            `,
        });
        return await message('Please follow the instruction in email');
    }

    async resetPassword(user: UserEntity, code: string): Promise<{ message: string }> {
        let newPassword = uuid();
        if (await this.tokenStore.verify(code)) {
            try {
                await this.userService.update(user.id, { password: newPassword });
            } catch (err) {
                this.logger.error(err);
                new InternalServerErrorException('We could not reset password for some reasons. Please try again.');
            }
            this.eventEmitter.emit(EmailEvents.FORGOT_PASSWORD, {
                email: user.email,
                message: `Here is your new password, "${newPassword}", you do not need to update it.`,
            });
            return await message(`We sent your new password to your email, ${user.email}.`);
        }
        throw new BadRequestException('The code is not valid! Please request a new one!');
    }
}
