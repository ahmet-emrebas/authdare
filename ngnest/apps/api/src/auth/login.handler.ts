import { AuthEvents } from './auth.events';
import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
import { AuthActionHandler } from 'apps/auth/src/auth.controller';
import { Connection } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { SessionData } from 'express-session';

type Form = {
    email: string;
    password: string;
};

export const loginHandler: AuthActionHandler = ({
    userRepository,
    eventEmitter,
    form,
    session,
}: AuthActionHandlerArgument) => {
    eventEmitter.emit(AuthEvents.LOGIN, 'I can log in');
    return 'loginHandler';
};
