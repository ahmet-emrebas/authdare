import { ConnectionOptions } from 'typeorm';

export interface DatabaseOptions {
    options?: ConnectionOptions;

    /**
     * @local the connection options is in req.locals.connection
     * @remote the coonection options comes from external, which is defined in req.locals.remoteConnectionURL.
     */
    strategy: 'local' | 'remote';

    /**
     * If strategy is remote, this URL will be used to get connection options.
     */
    url?: string;
}
