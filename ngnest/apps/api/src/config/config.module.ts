import { Models } from './../models/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule as _ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { createConnection } from 'typeorm';
import { waitFor } from '@authdare/common/util';

function loadLocalConfig(): Record<string, any> {
    return yaml.load(
        readFileSync(join(__dirname, 'config', 'config.yaml'), 'utf8') +
            readFileSync(join(__dirname, 'config', 'database.config.yaml'), 'utf8'),
    ) as Record<string, any>;
}

@Global()
@Module({
    imports: [
        _ConfigModule.forRoot({
            isGlobal: true,
            load: [loadLocalConfig],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const logger = new Logger(GlobalConfigModule.name);
                const initial = config.get('database.initial');
                const maindatabase = config.get('database.main') as any;

                const con = await createConnection(initial as any);
                try {
                    for (let d of initial.databases) await con.query(`CREATE DATABASE ${d};`);
                } catch (err: any) {
                    logger.error(err.message);
                }
                await waitFor(2000);
                const entities = maindatabase.entities
                    .map((e: string) => Models.find((m) => m?.name == e))
                    .map((e: any) => e?.entity)
                    .filter((e: any) => e);

                maindatabase.entities = entities;
                maindatabase.replication.master.entities = entities;
                maindatabase.replication.slaves = maindatabase.replication.slaves.map((e: any) => ({
                    ...e,
                    entities,
                }));

                return maindatabase;
            },
        }),
    ],
})
export class GlobalConfigModule {}
