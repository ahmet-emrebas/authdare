import { genToken } from '@authdare/common';
import { ResourceService } from "../resource";

export const DB_MANAGER_TOKEN = genToken();

export const ENTITIES_TOKEN = genToken();

export const CONNECTION_OPTIONS_TOKEN = genToken();

/**
 * How to determine the resouce service
 */
export interface DBManager<O = any> {
    resource(options: O): Promise<ResourceService>;

}