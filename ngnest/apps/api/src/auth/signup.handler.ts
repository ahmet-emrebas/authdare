import { AuthEvents } from './auth.events';
import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
import { AuthActionHandler } from 'apps/auth/src/auth.controller';
import { t } from '@authdare/common/type';
import { IsEmail, Length } from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

class SignupForm {
    @Length(1, 100) firstName = t<string>();
    @Length(1, 100) lastName = t<string>();
    @IsEmail() email = t<string>();
    @Length(6, 100) password = t<string>();
    @Length(3, 100) orgname = t<string>();
}

export const signupHandler: AuthActionHandler = async ({
    userRepository,
    eventEmitter,
    form,
    session,
    databaseService,
}: AuthActionHandlerArgument<SignupForm>) => {
    try {
        const orgname = `authdare_` + form.orgname + '_' + new Date().getTime();

        const created = await userRepository?.save({ ...form, orgname });
        eventEmitter.emit(AuthEvents.SIGNUP, { email: form.email });
        session.user = created;

        try {
            await databaseService?.createDBFromTemplate(orgname);
        } catch (err) {
            eventEmitter.emit(AuthEvents.ERROR, {
                title: 'Client database could NOT be created!',
                message: JSON.stringify(err),
            });
        }
        return { message: 'Welcome to Authdare' };
    } catch (err) {
        console.error(err);
        throw new NotAcceptableException('The account already exists!');
    }
};
