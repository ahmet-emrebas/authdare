import { AuthEvents } from './auth-database.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateAuthUserDTO } from './sub';

enum Templates {
    GREETING = './greeting',
    FORGOT_PASSWORD = './forgot_password',
    INVITATION = './invitation',
}

@Injectable()
export class AuthEmailService {

    constructor(private readonly email: MailerService) { }

    /**
     * Send forgot password email
     */
    @OnEvent(AuthEvents.FORGOT_PASSWORD_EMAIL)
    async resetPassword(payload: CreateAuthUserDTO) {
        await this.email.sendMail({
            to: payload.email,
            subject: "Password Reset",
            template: "./forgot_password",
            context: {
                newPassword: payload.password
            },
            text: `Here is your temporary password " ${payload.password} "`
        });
    }


    /**
     * Send greeting email
     */
    @OnEvent(AuthEvents.SIGNUP_EMAIL)
    async greeting(payload: CreateAuthUserDTO) {
        await this.email.sendMail({
            to: payload.email,
            subject: 'Hello!',
            template: './greeting',
            context: {
                username: payload.email
            },
        })
    }


    /**
     * Send invitation email to the user newly created. 
     */
    @OnEvent(AuthEvents.CREATE_MEMBER_EMAIL)
    invitation(payload: CreateAuthUserDTO) {

    }

}