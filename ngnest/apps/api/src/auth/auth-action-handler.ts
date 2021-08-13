import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { t } from '@authdare/common/type';
import { SubscriberEntity } from 'apps/api/src/models/user';
import { DatabaseService } from '../database/database.service';

export class AuthActionHandlerArgument<Form = any, TSession = any> {
    form = t<Form>();
    session = t<TSession>();
    eventEmitter = t<EventEmitter2>();
    orgname? = t<string>();
    databaseService? = t<DatabaseService>();
    userRepository? = t<Repository<SubscriberEntity>>();
}

export type AuthActionHandler<Form = any, TSession = any, ReturnType = any> = (
    arg: AuthActionHandlerArgument<Form, TSession>,
) => ReturnType;
