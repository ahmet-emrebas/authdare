import { ConnectionOptions, getConnection, createConnection } from 'typeorm';
import { DynamicModule, Module, Scope } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ProvideSession, SESSION } from '../session';
import { SessionDatabase, Session } from '../interface';
import { HttpService } from '@nestjs/axios';
import { map, firstValueFrom } from 'rxjs';
import { t } from '../type';

@Module({})
export class ConnectionModule {
    static async configure(
        moduleDB: keyof SessionDatabase,
        entities: ClassConstructor<any>[],
    ): Promise<DynamicModule> {
        return {
            module: ConnectionModule,
            providers: [
                ProvideSession(),
                {
                    scope: Scope.REQUEST,
                    provide: 'asdfasdf',
                    inject: [SESSION, HttpService],
                    useFactory: async (session: Session, http: HttpService) => {
                        const databaseOptions = session.database[moduleDB];
                        const strategy = databaseOptions.strategy;

                        let options: ConnectionOptions = t<ConnectionOptions>(undefined);

                        const remoteOptions = http
                            .get(databaseOptions.url!)
                            .pipe(map((res) => res.data));

                        if (strategy == 'local') {
                            options = databaseOptions.options!;
                        } else if (strategy == 'remote') {
                            options = await firstValueFrom(remoteOptions);
                        }

                        if (!options) {
                            return;
                        }

                        try {
                            return getConnection(options.name);
                        } catch (err) {
                            return await createConnection({ ...options, entities });
                        }
                    },
                },
            ],
        };
    }
}
