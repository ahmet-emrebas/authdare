import { RequestParams } from './request-params';
import { flatten, keys, values, without } from "lodash";
import { Connection, createConnection, getConnection } from "typeorm";
import { TaskEntity, UserEntity } from "../models";

export const entities = () => ({
    tasks: TaskEntity,
    users: UserEntity
})





export async function orgConnection(orgname: string, sync?: boolean, drop?: boolean) {
    let con: Connection;
    try {
        con = getConnection(orgname);
    } catch (err) {
        con = await createConnection({
            name: orgname,
            type: 'sqlite',
            database: `database/${orgname}/main.sqlite`,
            entities: values(entities()),
            synchronize: sync,
            dropSchema: drop
        })
    }
    return con;
}


export async function getOrgRepository({ orgname, resource }: RequestParams) {
    let con = await orgConnection(orgname);
    return con.getRepository(entities[resource]);
}


export function adminPermissions(orgname: string) {
    return flatten(['get', 'post', 'patch', 'delete'].map(m => keys(entities()).map(r => `${orgname}:${m}:${r}`)));
}


