import { Permission } from './role-and-permission';
import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const PERMISSION_DECORATOR = 'PERMISSION_DECORATOR';

/**
 * Add this decorator to the secured routes with specific permissions.
 * @returns {CustomDecorator}
 */
export const Permissions = (...permissions: Permission[]): CustomDecorator => SetMetadata(PERMISSION_DECORATOR, permissions)
