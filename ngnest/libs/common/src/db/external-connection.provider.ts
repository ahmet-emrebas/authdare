import { v4 } from 'uuid';
import { Msg } from '../messages/messages.enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { Provider, Scope } from '@nestjs/common';
import { Connection, ConnectionOptions, getConnection, createConnection } from 'typeorm';
import { SessionDatabase } from '../interface/session-database';
import { Request } from '../interface';
import { t } from '../type';
import { ClassConstructor } from 'class-transformer';
import { ExceptionService } from '../exception';

export const CONNECTION = v4();

/**
 * @param connectionToken The token used to inject the connection
 * @param iGetConnectionToken The token used to get the implementation of IGetConenctionOptions fromt he scope and use it to create a new conenction or get the existing one.
 * @returns
 */
export function ExternalConnectionProvider(
    key: keyof SessionDatabase,
    entities: ClassConstructor<any>[],
): Provider<Promise<Connection>> {
    return {
        scope: Scope.REQUEST,
        provide: CONNECTION,
        inject: [REQUEST, HttpService, ExceptionService],
        useFactory: async function (req: Request, http: HttpService, exception: ExceptionService) {
            const databaseOptions = req.userSession?.database[key];

            if (!databaseOptions) {
                exception.internal('There is not database connection');
            }
            const strategy = databaseOptions.strategy;

            let options: ConnectionOptions = t<ConnectionOptions>(undefined);

            const remoteOptions = http.get(databaseOptions.url!).pipe(map((res) => res.data));

            if (strategy == 'local') {
                options = databaseOptions.options!;
            } else if (strategy == 'remote') {
                options = await firstValueFrom(remoteOptions);
            }

            if (!options?.name) {
                exception.notFound(Msg.DB.DB_NAME_IS_UNDEFINED);
            }

            try {
                return getConnection(options?.name);
            } catch (err) {
                return await createConnection({ ...options, entities });
            }
        },
    };
}
