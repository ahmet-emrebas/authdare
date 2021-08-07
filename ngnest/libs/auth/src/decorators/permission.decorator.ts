import { PolicyKeys } from './policy-keys';
import { SetMetadata } from '@nestjs/common';

/**
 * Enforce Permission for the resource
 * @param permission Unique string
 * @returns CustomDecorator<string>
 */
export function PermissionPolicy(permission: string) {
    return SetMetadata(PolicyKeys.PERMISSION, permission);
}
