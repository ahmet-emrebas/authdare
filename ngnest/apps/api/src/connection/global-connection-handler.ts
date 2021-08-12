import { GlobalConnectionHandler } from '@authdare/common/module';
import { Request } from 'express';
import { getConnection } from 'typeorm';

export const globalConnectionHandler: GlobalConnectionHandler = async (req: Request) => {
    return getConnection();
};
