import { DatabaseService } from './database.service';
import { Module, DynamicModule, Scope, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TEMPLATE_DATABASE, TEMPLATE_DATABASE_TOKEN } from './database.consts';
import { createConnection } from 'typeorm';
import { Queries } from './queries';

@Global()
@Module({})
export class DatabaseModule {
    static async init(entities: any[]): Promise<DynamicModule> {
        const initialDatabaseName = 'authdare' + '_' + new Date().getTime();

        const con = await createConnection({
            name: 'tobeclosed',
            type: 'postgres',
            database: 'postgres',
            username: 'postgres',
            password: 'password',
        });

        const dbs = ((await con.query(Queries.dbs())) as string[])
            .map((e: any) => e.datname)
            .filter((e) => e.startsWith('authdare_1'))
            .sort();

        if (dbs.length > 4) {
            const firstOne = dbs.shift();
            await con.query(Queries.terminate(firstOne));
            await con.query(Queries.drop(firstOne));
        }

        const previousDB = dbs.pop();

        await con.query(Queries.terminate(previousDB));
        try {
            if (previousDB) {
                await con.query(Queries.createFromTemplate(initialDatabaseName, previousDB));
            } else {
                await con.query(Queries.create(initialDatabaseName));
            }
            await con.query(Queries.create(TEMPLATE_DATABASE));
        } catch (err) {
            console.error(err);
        } finally {
            await con.close();
        }

        return {
            module: DatabaseModule,
            imports: [
                /**
                 * This database is not to be connected and there is no data in it.
                 */
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            name: '<noConnection>',
                            type: 'postgres',
                            database: TEMPLATE_DATABASE,
                            entities,
                            username: 'postgres',
                            password: 'password',
                            synchronize: true,
                            dropSchema: true,
                            keepConnectionAlive: false,
                        };
                    },
                }),

                /**
                 * This is the production database, whenever we run the application, new database created and the old data copied to the new one
                 */
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            type: 'postgres',
                            database: initialDatabaseName,
                            entities,
                            username: 'postgres',
                            password: 'password',
                            synchronize: previousDB ? false : true,
                            dropSchema: previousDB ? false : true,
                        };
                    },
                }),
            ],
            providers: [
                DatabaseService,
                {
                    provide: TEMPLATE_DATABASE_TOKEN,
                    useValue: TEMPLATE_DATABASE,
                },
            ],
            exports: [DatabaseService, TEMPLATE_DATABASE_TOKEN],
        };
    }
}
