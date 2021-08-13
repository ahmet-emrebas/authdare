import { Repository } from 'typeorm';
import { DatabaseService } from './../../database/src/database.service';
import { EventEmitter2 } from 'eventemitter2';
import { t } from '@authdare/common/type';
import { UserEntity } from '@authdare/models/user';

export class AuthActionHandlerArgument<Form = any, TSession = any> {
    form = t<Form>();
    session = t<TSession>();
    eventEmitter = t<EventEmitter2>();
    orgname? = t<string>();
    databaseService? = t<DatabaseService>();
    userRepository? = t<Repository<UserEntity>>();
}

export type AuthActionHandler<Form = any, TSession = any, ReturnType = any> = (
    arg: AuthActionHandlerArgument<Form, TSession>,
) => ReturnType;
