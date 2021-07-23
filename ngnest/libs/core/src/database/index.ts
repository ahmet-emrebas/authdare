import { DatabaseConfig } from '@authdare/config';
import { Constructor } from '../types/constructor';
import { cloneDeep } from 'lodash';
import { BaseResourceService } from '../controller';
import { ConnectionOptions, Connection, getConnection, Repository, createConnection } from 'typeorm';

/**
 * Get the database connection by name if alive or create the new conneciton with the proviced configurations. 
 * @param name 
 * @param config 
 * @returns 
 */
export async function getDBConnection(config?: ConnectionOptions): Promise<Connection> {
    let con: Connection
    try {
        con = getConnection(config.name);
        if (con) {
            return con;
        }
    } catch (err) {
        return await createConnection(cloneDeep(config))
    }
}


/**
 * Create a resource service by organization name and resouce entity
 * @param orgname 
 * @param entity 
 * @param createDto 
 * @param updateDto 
 * @returns {BaseResouceService}
 */
export async function getResourceService(config: ConnectionOptions, entity: Constructor, createDto: Constructor, updateDto: Constructor): Promise<BaseResourceService> {
    const con = await getDBConnection({ ...config });
    const repo = await con.getRepository(entity);
    return new BaseResourceService(repo, createDto, updateDto)
}

async function adminCon() {
    return getConnection(DatabaseConfig.name);
}

/**
 * Create database 
 * @param orgname 
 */
export async function createDB(orgname: string) {
    const admin = await adminCon();
    const result = await admin.query(`CREATE DATABASE ${orgname}`)
    return result;
}


/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
export async function createUser(username: string, password) {
    const admin = await adminCon();
    const result = await admin.query(`CREATE USER ${username} WITH PASSWORD '${password}'`)
    return result;
}

/**
 * 
 * @param database 
 * @param username 
 * @returns 
 */
export async function grantAllPrivilegesOnDatabaseToUser(database: string, username: string) {
    const admin = await adminCon()
    const result = await admin.query(`GRANT ALL PRIVILEGES ON DATABASE ${database} to ${username}`)
    return result;
}


