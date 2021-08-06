import { delay } from '@authdare/utils';
import { DatabaseController } from './database.controller';
import { ENTITIES_TOKEN } from './entities-token';
import { DynamicModule, Module } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SQLiteService } from './sqlite.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {

  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      controllers: [DatabaseController],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            await delay(1000)

            return {
              type: 'sqlite',
              database: 'database/database/main.sqlite',
              entities: [],
              synchronize: true,
              dropSchema: true,
            }
          }
        })
      ],

      providers: [
        SQLiteService,
        {
          provide: ENTITIES_TOKEN,
          useValue: []
        }
      ],
      exports: [SQLiteService],
    }
  }
}
