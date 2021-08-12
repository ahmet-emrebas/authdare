import { AuthEvents } from './auth.events';
import { IsEmail, Length } from 'class-validator';
import { ShortMessage } from './auth-mailler.service';
import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
import { AuthActionHandler } from 'apps/auth/src/auth.controller';
import { Connection } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { SessionData } from 'express-session';
import { t } from '@authdare/common/type';
import { v4 as uuid } from 'uuid';
import { NotAcceptableException } from '@nestjs/common';
/**
 * Verification codes
 */
const vc: Record<string, string> = {};

class ForgotForm {
    @IsEmail() email = t<string>();
    @Length(10, 50) code = t<string>();
}

export const forgotPasswordHandler: AuthActionHandler<ForgotForm, SessionData> = async ({
    userRepository,
    eventEmitter,
    form,
    session,
    orgname,
}: AuthActionHandlerArgument<ForgotForm>) => {
    // const found = await userRepository?.findOneOrFail({ where: { email: form.email } })!;

    if (form.code && form.email) {
        if (vc[form.email] && vc[form.email] == form.code) {
            const newPassword = uuid();
            // await userRepository?.update(found.id, { password: newPassword });
            eventEmitter.emit(AuthEvents.PASSWORD_RESET, {
                email: form.email,
                title: 'New Password',
                message: newPassword,
            });

            delete vc[form.email];

            return { message: 'Please checkout inbox.' };
        } else {
            throw new NotAcceptableException('Code is invalid');
        }
    } else if (form.email) {
        const code = uuid();
        vc[form.email] = code;

        eventEmitter.emit(AuthEvents.PASSWORD_RESET, {
            email: form.email,
            title: 'Verification Code',
            message: code,
        } as ShortMessage);
        return { message: 'Please check your inbox.' };
    }
    return 'forgotPasswordHandler';
};
