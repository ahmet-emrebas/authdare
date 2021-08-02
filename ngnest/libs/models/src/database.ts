import { classToPlain } from 'class-transformer';
import { flatten } from 'lodash';
import { ClassConstructor } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { snakeCase, values, keys } from 'lodash';
import {
  Connection,
  createConnection,
  getConnection,
  Repository,
} from 'typeorm';

type DatabaseParameters = {
  orgname: string;
  resource: string;
};
export function resolveResouceName(clazzConstactor: ClassConstructor<any>) {
  return snakeCase(clazzConstactor.name).split('_')[0] + 's';
}

export const DATABASE_MANAGER_TOKEN = 'DATABASE_MANAGER_TOKEN';

export interface DatabaseManager<P> {
  orgConnection(
    orgname: string,
    synchronize?: boolean,
    dropSchema?: boolean,
  ): Promise<Connection>;
  getResouceNames(): string[];
  getEntities(): any[];
  getEntityByResourceName(resourceName: string): any;
  getRepositoryByOrgname<E = any>(
    params: DatabaseParameters,
  ): Promise<Repository<E>>;
  getUserRepositoryByOrgname<E = any>(orgname?: string): Promise<Repository<E>>;
  adminPermissions(): P[];
}

@Injectable()
export class SQLiteDatabasaManager<PermissinType>
  implements DatabaseManager<PermissinType>
{
  private readonly entitiesMap: { [key: string]: any } = {};

  constructor(
    private readonly _entities: ClassConstructor<any>[],
    private readonly _permissionOptions: {
      methods: string[];
      permissionClass: ClassConstructor<PermissinType>;
    },
  ) {
    this._entities.forEach((e) => {
      const resourceName = resolveResouceName(e);
      this.entitiesMap[resourceName] = e;
    });
  }

  adminPermissions(): PermissinType[] {
    return flatten(
      this._permissionOptions?.methods.map((m) => {
        return this.getResouceNames().map((r) => {
          return classToPlain(
            new this._permissionOptions.permissionClass(m, r),
          ) as PermissinType;
        });
      }),
    );
  }

  /**
   * Get database connection by organization
   * @param orgname
   * @param synchronize delete all tables and recreate the database
   * @param dropSchema delete all tables and recreate the database
   * @returns
   */
  async orgConnection(
    orgname: string,
    synchronize = false,
    dropSchema = false,
  ): Promise<Connection> {
    let con: Connection;
    try {
      con = getConnection(orgname);
    } catch (err) {
      con = await createConnection({
        name: orgname,
        type: 'sqlite',
        database: `database/${orgname}/main.sqlite`,
        entities: this.getEntities(),
        synchronize,
        dropSchema,
      });
    }
    return con;
  }

  /**
   * @returns name of the resources like ['users', 'tasks']
   */
  getResouceNames() {
    return keys(this.entitiesMap);
  }

  /**
   *
   * @returns [UserEntity, TaskEntity ]
   */
  getEntities() {
    return values(this.entitiesMap);
  }

  /**
   *
   * @param resourceName like users, tasks etc.
   * @returns a single entity like UserEntity
   */
  getEntityByResourceName(resourceName: string) {
    return this.entitiesMap[resourceName];
  }

  /**
   *
   * @param param0
   * @returns the repository of the Entity for org database.
   */
  async getRepositoryByOrgname<E>({ orgname, resource }: DatabaseParameters) {
    const con = await this.orgConnection(orgname);
    return con.getRepository<E>(this.getEntityByResourceName(resource));
  }

  /**
   * Get UserEntity repository by orgname
   * @param orgname
   * @returns
   */
  async getUserRepositoryByOrgname<E = any>(
    orgname: string,
  ): Promise<Repository<E>> {
    return await this.getRepositoryByOrgname({ orgname, resource: 'users' });
  }
}
