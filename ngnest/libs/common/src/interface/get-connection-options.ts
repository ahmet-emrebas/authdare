import { ConnectionOptions } from 'typeorm';

export const GET_CONNECTION_OPTIONS = '3a5a3e42-c9c0-45d5-89c4-c571bc24a8b2';

/**
 * How to get the connection options for the client database.
 * Implement this interface and provide it in the root module as global so all modules know how to get the client connection from a request.
 */
export interface GetConnectionOptions {
    get(req: Request): ConnectionOptions;
}
