
import { ResourceService } from '@authdare/core';
import { CreatePermissionDto, CreateRoleDto, ModelsMap, Permission, Role, UpdatePermissionDto, UpdateRoleDto, Entities, PermissionMethods } from '@authdare/models';
import { Connection } from 'typeorm';
export function initRolesAndPermissions(con: Connection) {
    const rolesService = new ResourceService(con.getRepository(Role), CreateRoleDto, UpdateRoleDto);
    const permissionsService = new ResourceService(con.getRepository(Permission), CreatePermissionDto, UpdatePermissionDto)

    // Create Permissions 
    //TODO : Working here

}