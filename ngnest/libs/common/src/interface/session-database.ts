import { DatabaseOptions } from './database.options';

export interface SessionDatabase {
    event: DatabaseOptions;
    mail: DatabaseOptions;
    log: DatabaseOptions;
    config: DatabaseOptions;
}
