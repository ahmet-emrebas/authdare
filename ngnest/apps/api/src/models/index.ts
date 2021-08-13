import { ClassConstructor } from 'class-transformer';
import { ClientUserEntity, SubscriberEntity } from './user';
import { LogEntity } from './log';

export const Models: { name: string; entity: ClassConstructor<any> }[] = [
    {
        name: 'users',
        entity: ClientUserEntity,
    },
    {
        name: 'logs',
        entity: LogEntity,
    },
    {
        name: 'clients',
        entity: SubscriberEntity,
    },
];
