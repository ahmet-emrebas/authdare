import { ExecutionContext } from '@nestjs/common';
import { BaseClass } from '@authdare/objects';
import { Expose } from 'class-transformer';
import { RoleDTO } from './role';
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
    @InitEach(RoleDTO)
    readonly roles!: RoleDTO[];
}

export type SessionType = {
    [CLIENT_SESSION_KEY]: ClientSession,
    [key: string]: any
}

export function setClientSession(session: SessionType, data: ClientSession): void {
    session[CLIENT_SESSION_KEY] = data;
}

export async function getClientSession(context: ExecutionContext): Promise<ClientSession> {
    const req = context.switchToHttp().getRequest<Request>()
    const session = req.session;
    const { errors, validatedInstance } = await new ClientSession((session as any)[CLIENT_SESSION_KEY]).transformAndValidate();
    if (errors) {
        return undefined!
    }
    return validatedInstance;
}