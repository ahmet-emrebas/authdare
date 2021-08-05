import { classToClass } from 'class-transformer';
import { Permission, RoleDTO } from './role-permission.dto';
import { CustomDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


function getMetaData<T>(context: ExecutionContext, reflector: Reflector, key: string) {
    return reflector.getAllAndOverride<T>(key, [
        context.getHandler(),
        context.getClass(),
    ]);
}

const ROLE_META_KEY = 'ROLE_META_KEY'
const PERMISSION_META_KEY = 'PERMISSION_META_KEY'
const PUBLIC_RESOURCE_META_KEY = 'PUBLIC_RESOURCE_META_KEY';



/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function HasRole(roles: RoleDTO[]): CustomDecorator<string> {
    return SetMetadata(ROLE_META_KEY, roles.map(e => classToClass(new RoleDTO(e))))
}

/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function HasPermission(permissions: Permission[]): CustomDecorator {
    return SetMetadata(PERMISSION_META_KEY, permissions.map(e => classToClass(new Permission(e))))
}

/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function PublicResource(): CustomDecorator<string> {
    return SetMetadata(PUBLIC_RESOURCE_META_KEY, true)
}


/**
 * Extract the required roles from context.
 * @param context 
 * @param reflector 
 * @returns {RoleDTO[]} required roles for the resource
 */
export function getRequiredRoles(context: ExecutionContext, reflector: Reflector): RoleDTO[] {
    return getMetaData<RoleDTO[]>(context, reflector, ROLE_META_KEY);
}

/**
 * Extract the required permissions from context
 * @param context 
 * @param reflector 
 * @returns {Permission[]} required permissions for the resource.
 */
export function getRequiredPermissions(context: ExecutionContext, reflector: Reflector): Permission[] {
    return getMetaData<Permission[]>(context, reflector, PERMISSION_META_KEY);
}

/**
 * Check the resource is decorated with PublicResource decorator and return the value passed along it.
 * @param context 
 * @param reflector 
 * @returns {boolean}
 */
export function isPublicResource(context: ExecutionContext, reflector: Reflector): boolean {
    return getMetaData<boolean>(context, reflector, PUBLIC_RESOURCE_META_KEY);
}

export interface AuthContext {
    roles: RoleDTO[],
    permissions: Permission[],
    isPublic: boolean
}

export function getAuthContext(context: ExecutionContext, reflector: Reflector): AuthContext {
    return {
        roles: getRequiredRoles(context, reflector),
        permissions: getRequiredPermissions(context, reflector),
        isPublic: isPublicResource(context, reflector),
    }
}
