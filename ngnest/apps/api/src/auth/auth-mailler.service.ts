import { AuthEvents } from './auth.events';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UseFilters, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export type GreetingMessage = {
    email: string;
};

export type ShortMessage = {
    title: string;
    message: string;
} & GreetingMessage;

@Injectable()
class EmailExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {}
}

@UseFilters(EmailExceptionFilter)
@Injectable()
export class AuthMaillerService {
    private readonly logger = new Logger(AuthMaillerService.name);
    constructor(private readonly mailService: MailerService) {}

    async sendInternalErrorMessage(title: string, message: string) {
        await this.mailService.sendMail({
            to: 'aemrebas.dev@gmail.com',
            subject: 'Error Log',
            template: './short-message',
            context: { title, message },
        });
    }

    @OnEvent(AuthEvents.PASSWORD_RESET)
    async forgotPassword({ title, email, message }: ShortMessage) {
        try {
            await this.mailService.sendMail({
                to: email,
                subject: 'Password Reset',
                template: './short-message',
                context: { title, message },
            });
        } catch (err: any) {
            await this.sendInternalErrorMessage(
                'Password Reset Error',
                `Could not send the password-reset code to ${email}.`,
            );
        }
    }

    @OnEvent(AuthEvents.SIGNUP)
    async signup({ email }: { email: string }) {
        try {
            await this.mailService.sendMail({
                to: email,
                subject: 'Welcome',
                template: './greeting',
            });
        } catch (err) {
            await this.sendInternalErrorMessage(
                `Signup Error`,
                `Could not send greeting message to ${email}`,
            );
        }
    }

    @OnEvent(AuthEvents.ERROR)
    async error({ message, title }: ShortMessage) {
        await this.mailService.sendMail({
            to: 'aemrebas.dev@gmail.com',
            subject: 'Auth Error',
            template: './short-message',
            context: {
                title,
                message,
            },
        });
    }
}
