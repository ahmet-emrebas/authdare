import { ExecutionContext } from '@nestjs/common';
import { BaseClass } from '@authdare/objects';
import { Expose } from 'class-transformer';
import { Role } from './role';
import { InitEach } from '@authdare/utils';
import { Request } from 'express';


const CLIENT_SESSION_KEY = 'auth';

export enum Cookies { FORGOT_PASSWORD = 'forgot_password' }

export class ClientSession extends BaseClass<ClientSession> {
    @Expose()
    readonly visits!: number;

    @Expose()
    readonly id!: number;

    @Expose()
    readonly email!: string;

    @Expose()
    readonly orgname!: string;

    @Expose()
    @InitEach(Role)
    readonly roles!: Role[];
}

export type SessionType = {
    [CLIENT_SESSION_KEY]: ClientSession,
    [key: string]: any
}

export function setClientSession(session: SessionType, data: ClientSession): void {
    session[CLIENT_SESSION_KEY] = data;
}

export async function getClientSession(context: ExecutionContext): Promise<ClientSession | undefined> {
    const req = context.switchToHttp().getRequest<Request>()
    const session = req.session;


    if (!session) return undefined;

    const authSession = (session as any)[CLIENT_SESSION_KEY];

    if (!authSession) return undefined;

    const { errors, validatedInstance } = await new ClientSession(authSession).transformAndValidate();

    if (errors) {
        return undefined!
    }
    return validatedInstance;
}