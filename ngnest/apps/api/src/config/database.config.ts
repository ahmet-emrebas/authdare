import { ConnectionOptions } from 'typeorm';

/**
 * Database Admin/Superuser Configuration
 */
// export const DatabaseConfig: ConnectionOptions = {
//   type: 'mysql',
//   host: '162.241.224.137',
//   port: 3306,
//   database: 'aemrebas_test001',
//   username: 'aemrebas_test001',
//   password: 'aemrebas_test001',
//   synchronize: true,
//   dropSchema: true,
// };

export const DatabaseConfig: ConnectionOptions = {
  type: 'sqlite',
  database: 'database/authdare.sqlite',
  synchronize: true,
  dropSchema: true,
}

// export const DatabaseConfig: ConnectionOptions = {
//   type: 'sqlite',
//   database: 'database/authdare_db.sqlite',
//   synchronize: true,
//   dropSchema: true,
// }
