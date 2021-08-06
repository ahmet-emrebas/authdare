import { ResourcePolicy } from './resource-policy';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IRole } from '@authdare/interfaces';

/**
 * Enforce one or more roles for the resource path
 * @returns {CustomDecorator<string>}
 */
export function RolesPolicy(roles: IRole[]): CustomDecorator<string> {
    return SetMetadata(ResourcePolicy.ROLE, roles)
}
