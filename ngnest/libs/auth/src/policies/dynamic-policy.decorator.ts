import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { Policies } from './resource-policy';

/**
 * Enforce one or more permissions for the resouce path by setting the value of MemberPolicy key to true
 * @returns {CustomDecorator<string>}
 */
export function EnforceDynamicPolicy(): CustomDecorator {
    return SetMetadata(Policies.DYNAMIC, true)
}

