import { Permission, RoleDTO } from './role-permission.dto';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDecoratorTokens } from '@authdare/decorators/auth';


function getMetaData<T>(context: ExecutionContext, reflector: Reflector, key: string) {
    return reflector.getAllAndOverride<T>(key, [
        context.getHandler(),
        context.getClass(),
    ]);
}


/**
 * Extract the required roles from context.
 * @param context 
 * @param reflector 
 * @returns {RoleDTO[]} required roles for the resource
 */
export function getRequiredRoles(context: ExecutionContext, reflector: Reflector): RoleDTO[] {
    return getMetaData<RoleDTO[]>(context, reflector, AuthDecoratorTokens.HasRoleToken);
}

/**
 * Extract the required permissions from context
 * @param context 
 * @param reflector 
 * @returns {Permission[]} required permissions for the resource.
 */
export function getRequiredPermissions(context: ExecutionContext, reflector: Reflector): Permission[] {
    return getMetaData<Permission[]>(context, reflector, AuthDecoratorTokens.HasPermissionToken);
}

/**
 * Check the resource is decorated with PublicResource decorator and return the value passed along it.
 * @param context 
 * @param reflector 
 * @returns {boolean}
 */
export function isPublicResource(context: ExecutionContext, reflector: Reflector): boolean {
    return getMetaData<boolean>(context, reflector, AuthDecoratorTokens.PublicResourceToken);
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
