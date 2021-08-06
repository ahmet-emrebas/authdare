import { IPermission } from './i-permission';
import { Policy } from './policy';
import { PolicyKey } from './policy.key';

/**
 * Enforce one or more permissions for the resouce path.
 * @returns Policy<IPermission[]>
 */
export function EnforcePermissionPolicy(permissions: IPermission[]): Policy<IPermission[]> {
    return new Policy(PolicyKey.PERMISSION, permissions)
}

