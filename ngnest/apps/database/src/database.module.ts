import { DatabaseService } from './database.service';
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TEMPLATE_DATABASE, TEMPLATE_DATABASE_TOKEN } from './database.tokens';

@Module({})
export class DatabaseModule {
    static init(entities: any[]): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                /**
                 * This database is not to be connected
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

                // Default Connection
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            type: 'postgres',
                            database: 'authdare',
                            entities,
                            username: 'postgres',
                            password: 'password',
                            synchronize: true,
                            dropSchema: true,
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
