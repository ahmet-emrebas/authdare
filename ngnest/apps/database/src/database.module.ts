import { UserEntity } from '@authdare/models/user';
import { DPT } from './database-provider.tokens';
import { range } from 'lodash';
import { CommonConstructor } from '@authdare/common/class';
import { t } from '@authdare/common/type';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { ConnectionOptions, createConnection } from 'typeorm';
import { waitFor } from '@authdare/common/util';
import { v4 } from 'uuid';
import { CCM } from './client-connection.module';

/**
 * Generate somekeys;
 */
for (let i of range(0, 4)) {
    console.log(v4());
}

class DatabaseConfig extends CommonConstructor<DatabaseConfig> {
    connection = t<ConnectionOptions>();
}

/**
 * @basepath /dba
 * @doc https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
 *
 */
@Module({})
export class DatabaseModule {
    private static logger = new Logger(DatabaseModule.name);
    static async configure(conf: DatabaseConfig): Promise<DynamicModule> {
        await waitFor(2000);

        // template database name
        const templateDatabaseName = conf.connection.database + '_template';

        await this.createTDB(conf.connection, templateDatabaseName);

        return {
            module: DatabaseModule,
            imports: [
                ConfigModule.forRoot({
                    isGlobal: false,
                    cache: true,
                    expandVariables: false,
                    load: [() => conf],
                }),
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return conf.connection;
                    },
                }),
                CCM.configure(conf.connection),
            ],
            providers: [
                DatabaseService,
                {
                    provide: DPT.DATABASE_TEMPLATE_NAME,
                    useValue: templateDatabaseName,
                },
            ],
            exports: [CCM],
        };
    }

    /**
     * Create template database
     * @param conf
     */
    static async createTDB(conf: ConnectionOptions, templateDatabaseName: string) {
        try {
            try {
                (
                    await (
                        await createConnection({ ...conf, name: 'dc' } as any)
                    ).query(`CREATE DATABASE ${templateDatabaseName};`)
                ).close();
            } catch (err: any) {
                this.logger.error(err.message);
            }

            // will create the tables in database
            (
                await createConnection({
                    ...conf,
                    name: 'tc',
                    database: templateDatabaseName,
                    entities: [UserEntity],
                    synchronize: true,
                    dropSchema: true,
                } as any)
            ).close();

            this.logger.log(`CREATED TEMPLATE DATABASE and TABLES ${templateDatabaseName}`);
        } catch (err) {
            this.logger.error(err);
        }
    }
}
