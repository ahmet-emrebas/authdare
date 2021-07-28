import { values } from 'lodash';
import { Connection, createConnection, getConnection } from 'typeorm';
import { getModelMap } from './model-map';

export async function getDBConnection(
  orgname: string,
  sync?: boolean,
  drop?: boolean,
) {
  let con: Connection;
  const modelMap = await getModelMap();
  try {
    con = getConnection(orgname);
  } catch (err) {
    con = await createConnection({
      name: orgname,
      type: 'sqlite',
      database: `database/${orgname}/main.sqlite`,
      entities: values(modelMap).map((e) => e.entity),
      synchronize: sync,
      dropSchema: drop,
    });
  }
  return con;
}
