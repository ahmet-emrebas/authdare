import { Provider } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

export interface IGet<T> {
    get(): T | Promise<T>;
}

/**
 * Define how to get the client connection options/configuration
 * @securityNotice Please read the ConnectionName note!
 * Typeorom has ConnectionOptions interface. That interface has name field. The name field is used to get already established connection instead of creating a new one.
 * That strategy is used for performance reasons in this application as well.
 * So connection name must be unique unless requests are comming from clients of the same organization.
 *
 * @ConnectionName Connection NAME MUST BE UNIQUE FOR each client! (30%) It might cause vital vulnerabilities of data confidentiality between clients.
 * Because when there is an existing connection, then new connection is NOT created AND available connection with the name of the connection is used.
 * For example, let's say there are two request from A and B.
 * A and B have the connection name "xyz"
 * When A make a request, if B already made request and established the "xyz" connection, then A will use the same connection of B,
 * which causes serious data confidentiality problem.
 * So make sure the name of the connection is unique.
 *
 */
export interface IGetClientDBConnection extends IGet<ConnectionOptions> {}

export interface IGetClientDBRespositories extends IGet<Provider<any>[]> {}
