import { CommonConstructor, SwaggerOptions, t } from '@authdare/common';

import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { plainToClass, Transform } from 'class-transformer';
import { ConnectionOptions } from 'typeorm';
import { validateSync } from 'class-validator';

class DatabaseConfigSchema extends CommonConstructor<DatabaseConfigSchema> {
    connection = t<ConnectionOptions>();
}

/**
 * @basepath /dba
 */
@Module({})
export class DatabaseModule {
    static async configure(conf: DatabaseConfigSchema): Promise<DynamicModule> {
        const logger = new Logger(DatabaseModule.name);
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
                        return {
                            type: 'sqlite',
                            synchronize: true,
                            dropSchema: true,
                            entities: [''],
                        };
                    },
                }),
            ],
            controllers: [DatabaseController],
            providers: [DatabaseService],
        };
    }
}
