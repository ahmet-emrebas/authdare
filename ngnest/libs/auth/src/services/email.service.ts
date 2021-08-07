import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserDTO } from '../user';
import { v4 as uuid } from 'uuid';

enum Templates {
    GREETING = './greeting',
    FORGOT_PASSWORD = './forgot-password',
    INVITATION = './invitation',
}

export class EmailEvents {
    static GREETING = uuid();
    static FORGOT_PASSWORD = uuid();
    static INVITATION = uuid();
    private constructor() {}
}

export interface TextMessage {
    email: string;
    message: string;
}

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    constructor(private readonly email: MailerService) {}

    /**
     * Send forgot password email
     */
    @OnEvent(EmailEvents.FORGOT_PASSWORD)
    async forgotPassword(payload: TextMessage) {
        await this.email.sendMail({
            to: payload.email,
            subject: 'Password Reset',
            template: Templates.FORGOT_PASSWORD,
            context: {
                message: payload.message,
            },
            text: payload.message,
        });
    }

    /**
     * Send greeting email
     */
    @OnEvent(EmailEvents.GREETING)
    async greeting(email: string) {
        this.logger.log(`Sending greeting email to  ${email}`);
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
