import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
enum Templates {
    GREETING = './greeting',
    SHORT_MESSAGE = './short-message',
    INVITATION = './invitation',
}

export interface ShortMessage {
    email: string;
    title: string;
    message: string;
}

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    constructor(private readonly email: MailerService) {}

    /**
     * Send forgot password email
     */
    async shortMessage(payload: ShortMessage) {
        await this.email.sendMail({
            to: payload.email,
            subject: 'Password Reset',
            template: Templates.SHORT_MESSAGE,
            context: payload,
            text: `${payload.title}: ${payload.message}`,
        });
    }

    /**
     * Send greeting email
     */
    async greeting(email: string) {
        this.logger.log(`Sending greeting email to  ${email}`);
        await this.email.sendMail({
            to: email,
            subject: 'Hello!',
            template: Templates.GREETING,
        });
    }
}
