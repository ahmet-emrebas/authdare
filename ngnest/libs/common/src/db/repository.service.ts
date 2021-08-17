import { REQUEST } from '@nestjs/core';
import { Connection } from 'typeorm';
import { IGet, Request } from '../interface';
import { Inject, Injectable, Optional, Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ResourceService } from '../base';
/**
 * Provide the
 */
export const GET_REPOSITORIES = '3a5a3e42-c9c0-45d5-89c4-c571bc24a8b2';

/**
 * Default implementation of IGetConnectionOptions
 */
@Injectable({ scope: Scope.REQUEST })
export class RepositoryService implements IGet<Connection> {
    constructor(
        @Inject(REQUEST) private readonly req: Request,
        private readonly httpService: HttpService,
        @Optional()
        @Inject()
        private readonly configService: ResourceService<Record<string, any>>,
    ) {}

    async get(): Promise<Connection> {
        // throw new InternalServerErrorException(Msg.DB.DB_STRATEGY_NOT_DEFINED);
        return null as any;
    }
}
