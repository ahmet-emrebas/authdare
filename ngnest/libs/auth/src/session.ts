import { ExecutionContext } from '@nestjs/common';
import { BaseClass } from '@authdare/objects';
import { Expose } from 'class-transformer';
import { Role } from './sub';
import { InitEach } from '@authdare/utils';
import { Request } from 'express';


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

export function getClientSession(context: ExecutionContext): ClientSession {
    const req = context.switchToHttp().getRequest<Request>()
    return (req.session as any)[CLIENT_SESSION_KEY] as ClientSession;
}