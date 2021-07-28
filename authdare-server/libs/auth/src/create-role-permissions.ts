import {
  CreatePermissionDTO,
  CreateRoleDTO,
  RoleEntity,
} from '@authdare/models';
import { getModelMap, getResourceService } from '@authdare/base';
import { values } from 'lodash';

/**
 * Create the permissions and admin role and return the admin role.
 * @param orgname
 * @returns
 */
export async function createRoleAndPermissions(
  orgname?: string,
): Promise<RoleEntity> {
  const ps = await getResourceService('permissions', orgname);
  const rs = await getResourceService<RoleEntity>('roles', orgname);

  const resources = values(await getModelMap()).map((e) => e.path);
  const methods = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

  for (const method of methods) {
    for (const resource of resources) {
      await ps.create(new CreatePermissionDTO({ method, resource }));
    }
  }

  const permissions = await ps.find();
  return await rs.create(
    new CreateRoleDTO({
      name: 'ADMIN',
      permissions: permissions.map((e) => ({ id: e.id })),
    }),
  );
}
