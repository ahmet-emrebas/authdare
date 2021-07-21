import { getEntitiesAsArray } from '@base';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as resources from '@resources';

export const TypeOrmModuleAdmin$ = TypeOrmModule.forRootAsync({
  useFactory: async function () {
    const options: TypeOrmModuleOptions = {
      type: 'sqlite',
      database: `database/authdare.sqlite`,
      entities: getEntitiesAsArray(resources),
      synchronize: true,
      dropSchema: true,
    };
    return options;
  },
});

// const adminPostgresOptions: TypeOrmModuleOptions = {
//   name: 'admin',
//   type: 'postgres',
//   host: process.env[ConfigEnum.DB_HOST],
//   port: parseInt(process.env[ConfigEnum.DB_PORT]),
//   database: process.env[ConfigEnum.DB_CLIENT_NAME],
//   username: process.env[ConfigEnum.DB_CLIENT_USERNAME],
//   password: process.env[ConfigEnum.DB_CLIENT_PASSWORD],
//   entities,
//   synchronize,
//   dropSchema,
// };
