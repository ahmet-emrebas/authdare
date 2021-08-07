import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserDTO } from '../user';
import { v4 as uuid } from 'uuid';

enum Templates {
    GREETING = './greeting',
    FORGOT_PASSWORD = './forgot_password',
    INVITATION = './invitation',
}

export class EmailEvents {
    static GREETING = uuid();
    static FORGOT_PASSWORD = uuid();
    static INVITATION = uuid();
    private constructor() {}
}

@Injectable()
export class EmailService {
    constructor(private readonly email: MailerService) {}

    /**
     * Send forgot password email
     */
    @OnEvent(EmailEvents.FORGOT_PASSWORD)
    async resetPassword(payload: CreateUserDTO) {
        await this.email.sendMail({
            to: payload.email,
            subject: 'Password Reset',
            template: Templates.FORGOT_PASSWORD,
            context: {
                newPassword: payload.password,
            },
            text: `Here is your temporary password " ${payload.password} "`,
        });
    }

    /**
     * Send greeting email
     */
    @OnEvent(EmailEvents.GREETING)
    async greeting(email: string) {
        await this.email.sendMail({
            to: email,
            subject: 'Hello!',
            template: Templates.GREETING,
        });
    }

    /**
     * Send invitation email to the user newly created contains username and password and login link
     */
    @OnEvent(EmailEvents.INVITATION)
    async invitation(email: string, payload: CreateUserDTO) {
        await this.email.sendMail({
            to: email,
            subject: 'Invitation',
            template: Templates.INVITATION,
            context: payload,
        });
    }
}
