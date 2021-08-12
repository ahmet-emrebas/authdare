import { AuthActionHandlerArgument } from './../../../auth/src/auth.controller';
import { AuthActionHandler } from 'apps/auth/src/auth.controller';
import { Connection } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { SessionData } from 'express-session';

type Form = {
    email: string;
};

export const forgotPasswordHandler: AuthActionHandler = ({
    connection,
    eventEmitter,
    form,
    session,
}: AuthActionHandlerArgument<Connection, EventEmitter2, Form, SessionData>) => {
    eventEmitter.emit('forgot', 'just forgot the password man');
    return 'forgotPasswordHandler';
};
