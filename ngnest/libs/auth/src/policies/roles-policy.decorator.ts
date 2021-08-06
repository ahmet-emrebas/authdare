import { Policies } from './resource-policy';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IRole } from './i-role';

/**
 * Enforce one or more roles for the resource path
 * @returns {CustomDecorator<string>}
 */
export function EnforceRolesPolicy(roles: IRole[]): CustomDecorator<string> {
    return SetMetadata(Policies.ROLE, roles)
}
