
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthDecoratorTokens } from '@authdare/decorators/auth';
import { Role } from './role';
import { Permission } from './permission'


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
 * @returns {Role[]} required roles for the resource
 */
export function getRequiredRoles(context: ExecutionContext, reflector: Reflector): Role[] {
    return getMetaData<Role[]>(context, reflector, AuthDecoratorTokens.HAS_ROLE_TOKEN);
}

/**
 * Extract the required permissions from context
 * @param context 
 * @param reflector 
 * @returns {Permission[]} required permissions for the resource.
 */
export function getRequiredPermissions(context: ExecutionContext, reflector: Reflector): Permission[] {
    return getMetaData<Permission[]>(context, reflector, AuthDecoratorTokens.HAS_PERMISSION_TOKEN);
}

/**
 * Check the resource is decorated with PublicResource decorator and return the value passed along it.
 * @param context 
 * @param reflector 
 * @returns {boolean}
 */
export function isPublicResource(context: ExecutionContext, reflector: Reflector): boolean {
    return getMetaData<boolean>(context, reflector, AuthDecoratorTokens.PUBLIC_RESOURCE_TOKEN);
}

export interface AuthContext {
    roles: Role[],
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
