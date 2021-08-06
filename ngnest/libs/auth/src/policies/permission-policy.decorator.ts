
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IPermission } from './i-permission';
import { Policies } from './resource-policy';

/**
 * Enforce one or more permissions for the resouce path.
 * @returns {CustomDecorator<string>}
 */
export function EnforcePermissionPolicy(permissions: IPermission[]): CustomDecorator {
    return SetMetadata(Policies.PERMISSION, permissions)
}

