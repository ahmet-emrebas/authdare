import { CreateRoleDto, UpdateRoleDto } from './role/create-role.dto';
import { UpdateDatabaseDto } from './database/create-database.dto';
import { CreateOrgDto, UpdateOrgDto } from './org/create-org.dto';
import { User } from './user';
import { ClassConstructor } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from './user';
import { CreateDatabaseDto, Database } from './database';
import { Role } from './role';
import { CreatePermissionDto, Permission, UpdatePermissionDto } from './permission';
import { Org } from './org';
import { map } from 'lodash';

export const ModelsMap: { [ke: string]: { entity: any, createDTO: ClassConstructor<any>, updateDTO: ClassConstructor<any> } } = {
    users: {
        entity: User,
        createDTO: CreateUserDto,
        updateDTO: UpdateUserDto
    },
    orgs: {
        entity: Org,
        createDTO: CreateOrgDto,
        updateDTO: UpdateOrgDto
    },
    databases: {
        entity: Database,
        createDTO: CreateDatabaseDto,
        updateDTO: UpdateDatabaseDto
    },
    roles: {
        entity: Role,
        createDTO: CreateRoleDto,
        updateDTO: UpdateRoleDto
    },
    permissions: {
        entity: Permission,
        createDTO: CreatePermissionDto,
        updateDTO: UpdatePermissionDto
    },
}

/**
 * @returns {Array<Entity>}
 */
export const Entities = () => map(ModelsMap, e => e.entity)