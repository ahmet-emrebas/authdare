import { AuthEvents } from './auth.events';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export type GreetingMessage = {
    email: string;
};

export type ShortMessage = {
    title: string;
    message: string;
} & GreetingMessage;

@Injectable()
export class AuthMaillerService {
    constructor(private readonly mailService: MailerService) {}

    @OnEvent(AuthEvents.PASSWORD_RESET)
    async forgotPassword({ title, email, message }: ShortMessage) {
        await this.mailService.sendMail({
            to: email,
            subject: 'Password Reset',
            template: './short-message',
            context: {
                title,
                message,
            },
        });
    }

    @OnEvent(AuthEvents.SIGNUP)
    async signup({ email }: { email: string }) {
        await this.mailService.sendMail({
            to: email,
            subject: 'Welcome',
            template: './greeting',
        });
    }

    @OnEvent(AuthEvents.ERROR)
    async error({ message, title }: ShortMessage) {
        await this.mailService.sendMail({
            to: 'support@authdare.com',
            subject: 'Auth Error',
            template: './short-message',
            context: {
                title,
                message,
            },
        });
    }
}
