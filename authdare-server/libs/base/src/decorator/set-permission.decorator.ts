import { SetMetadata } from "@nestjs/common";

export const SET_PERMISSION_KEY = 'SET_PERMISSION_KEY'
export const SetPermission = (permission: string) => SetMetadata(SET_PERMISSION_KEY, permission)

export function permissionString(method: 'get' | 'post' | 'update' | 'delete', resource: string) {
    return `${method}:${resource}`;
}