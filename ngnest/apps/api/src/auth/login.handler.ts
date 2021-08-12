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
    connection,
    eventEmitter,
    form,
    session,
}: AuthActionHandlerArgument<Connection, EventEmitter2, Form, SessionData>) => {
    eventEmitter.emit('login', 'I can log in');
    return 'loginHandler';
};
