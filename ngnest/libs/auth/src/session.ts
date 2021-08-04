import { BaseClass } from '@authdare/objects';
import { Expose } from 'class-transformer';
import { Role } from './sub';
import { InitEach } from '@authdare/utils';


const CLIENT_SESSION_KEY = 'auth';


export class ClientSession extends BaseClass<ClientSession> {
    @Expose()

    readonly visits!: number;

    @Expose()
    readonly email!: string;

    @Expose()
    readonly orgname!: string;

    @Expose()
    @InitEach(Role)
    readonly roles!: Role[];
}

export type SessionType = {
    [CLIENT_SESSION_KEY]: ClientSession
}

export function setClientSession(session: SessionType, data: ClientSession) {
    session[CLIENT_SESSION_KEY] = new ClientSession(data);
}