import { ConfigEnum } from '@base/config';
import {
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import {
  Connection,
  createConnection,
  getConnection,
} from 'typeorm';

export async function createRepository(orgname: string, entity: any) {
  let con: Connection;
  if (isEmpty(orgname)) {
    throw new UnprocessableEntityException('Please provide orgname');
  }

  const connectionName = orgname + '_db';

  try {
    con = await createConnection({
      name: orgname,
      type: process.env[ConfigEnum.DB_TYPE] as any,
      database: connectionName,
      username: process.env[ConfigEnum.DB_CLIENT_USERNAME],
      password: process.env[ConfigEnum.DB_CLIENT_PASSWORD],
      entities: [entity],
      synchronize: true,
      dropSchema: true,
    });
  } catch (err) {
    Logger.error(err);
    con = await getConnection(connectionName);
  }
  let repository$$;
  try {
    repository$$ = await con.getRepository(entity);
  } catch (err) {
    Logger.error(err);
    throw new InternalServerErrorException(
      'Cound not find the specified repository',
    );
  }

  return repository$$;
}
