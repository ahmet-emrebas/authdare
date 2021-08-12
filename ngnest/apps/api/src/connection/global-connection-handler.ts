import { GlobalConnectionHandler } from '@authdare/common/module';
import { UserEntity } from '@authdare/models/user';
import { entities } from '@authdare/models';
import { Request } from 'express';
import { createConnection, getConnection } from 'typeorm';

/**
 * This connection is for client useage only, if there is no valid session, then return null.
 * @param req
 * @returns
 */
export const globalConnectionHandler: GlobalConnectionHandler = async (req: Request) => {
    const user = (req.session as any).user as UserEntity;

    if (user == undefined) {
        return null!;
    }

    const { orgname } = user;
    try {
        return getConnection(orgname);
    } catch (err) {
        return await createConnection({
            name: orgname,
            type: 'postgres',
            database: orgname,
            entities,
            username: 'postgres',
            password: 'password',
        });
    }
};
