import { REQUEST } from '@nestjs/core';
import { Inject } from '@angular/core';
import { ConnectionOptions } from 'typeorm';
import { Request, IGetConnectionOptions } from '../interface';
import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, firstValueFrom } from 'rxjs';
/**
 * Provide the
 */
export const GET_CONNECTION_OPTIONS = '3a5a3e42-c9c0-45d5-89c4-c571bc24a8b2';

/**
 * Default implementation of IGetConnectionOptions
 */
@Injectable({ scope: Scope.REQUEST })
export class GetConnectionOptions implements IGetConnectionOptions {
    constructor(
        @Inject(REQUEST) private readonly req: Request,
        private readonly httpService: HttpService,
    ) {}

    async get(): Promise<ConnectionOptions> {
        const locals = this.req.locals;
        const strategy = locals.connectionStrategy;
        const remote = locals.remoteConnectionURL;
        const connectionOptions = locals.connectionOptions;

        const remoteConnectionRequest = this.httpService
            .get<ConnectionOptions>(remote)
            .pipe(map((data) => data.data));

        if (strategy == 'local') {
            return connectionOptions;
        } else if (strategy == 'remote') {
            return firstValueFrom(remoteConnectionRequest);
        }

        throw new InternalServerErrorException('Connection strategy is not defined for $clientID');
    }
}
