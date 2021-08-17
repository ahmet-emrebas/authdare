import { Msg } from '../../messages/messages';
import { ResourceService } from '../resource/resource.service';
import { REQUEST } from '@nestjs/core';
import { ConnectionOptions } from 'typeorm';
import { Request, IGetClientDBConnection } from '../../interface';
import { Inject, Injectable, InternalServerErrorException, Optional, Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
/**
 * Provide the
 */
export const GET_CLIENT_DB_CONNECTION = '3a5a3e42-c9c0-45d5-89c4-c571bc24a8b2';

/**
 * Default implementation of IGetConnectionOptions
 */
@Injectable({ scope: Scope.REQUEST })
export class GetClientDBConnection implements IGetClientDBConnection {
    constructor(
        @Inject(REQUEST) private readonly req: Request,
        private readonly httpService: HttpService,
        @Optional()
        @Inject()
        private readonly configService: ResourceService<Record<string, any>>,
    ) {}

    async get(): Promise<ConnectionOptions> {
        // throw new InternalServerErrorException(Msg.DB.DB_STRATEGY_NOT_DEFINED);
        return null as any;
    }
}
