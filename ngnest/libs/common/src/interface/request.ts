import { ConnectionOptions } from 'typeorm';
import { Request as ERequest } from 'express';

export interface RequestLocals {
    connectionOptions: ConnectionOptions;

    /**
     * @local the connection options is in req.locals.connection
     * @remote the coonection options comes from external, which is defined in req.locals.remoteConnectionURL.
     */
    connectionStrategy: 'local' | 'remote';

    /**
     * If strategy is remote, this URL will be used to get connection options.
     */
    remoteConnectionURL: string;
}

export interface Request extends ERequest {
    locals: RequestLocals;
}
