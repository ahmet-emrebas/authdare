import { IPermission } from '@authdare/interfaces';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { ResourcePolicy } from './resource-policy';

/**
 * Enforce one or more permissions for the resouce path.
 * @returns {CustomDecorator<string>}
 */
export function MemberPolicy(): CustomDecorator {
    return SetMetadata(ResourcePolicy.MEMBER, ResourcePolicy.MEMBER)
}

