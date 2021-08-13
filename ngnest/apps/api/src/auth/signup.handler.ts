import { AuthEvents } from './auth.events';
import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
import { AuthActionHandler } from 'apps/auth/src/auth.controller';
import { NotAcceptableException } from '@nestjs/common';

export const signupHandler: AuthActionHandler = async ({
    userRepository,
    eventEmitter,
    form,
    session,
    databaseService,
}: AuthActionHandlerArgument) => {
    const { email, orgname } = form;
    try {
        const created = await userRepository?.save(form);
        eventEmitter.emit(AuthEvents.SIGNUP, { email });
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
