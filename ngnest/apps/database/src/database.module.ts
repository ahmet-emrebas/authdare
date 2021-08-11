import { UserEntity } from './user/user.entity';
import { DPT } from './database-provider.tokens';
import { range } from 'lodash';
import { UserModule } from './user/user.module';
import { CommonConstructor } from '@authdare/common/class';
import { t } from '@authdare/common/type';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import {
    Connection,
    ConnectionOptions,
    createConnection,
    getManager,
} from 'typeorm';
import { waitFor } from '@authdare/common/utils';
import { v4 } from 'uuid';
import { CCM } from './client-connection.module';

/**
 * Generate somekeys;
 */
for (let i of range(0, 4)) {
    console.log(v4());
}

class DatabaseConfigSchema extends CommonConstructor<DatabaseConfigSchema> {
    connection = t<ConnectionOptions>();
}

/**
 * @basepath /dba
 */
@Module({})
export class DatabaseModule {
    private static logger = new Logger(DatabaseModule.name);
    static async configure(conf: DatabaseConfigSchema): Promise<DynamicModule> {
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
                UserModule,
            ],
            controllers: [DatabaseController],
            providers: [
                DatabaseService,
                {
                    provide: DPT.DATABASE_TEMPLATE_NAME,
                    useValue: templateDatabaseName,
                },
            ],
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

            this.logger.log(
                `CREATED TEMPLATE DATABASE and TABLES ${templateDatabaseName}`,
            );
        } catch (err) {
            this.logger.error(err);
        }
    }
}
