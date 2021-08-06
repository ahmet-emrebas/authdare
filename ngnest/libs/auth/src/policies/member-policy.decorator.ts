import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { PolicyKey } from './policy.key';

/**
 * Enforce one or more permissions for the resouce path by setting the value of MemberPolicy key to true
 * @returns {CustomDecorator<string>}
 */
export function EnforceMemberPolicy(): CustomDecorator {
    return SetMetadata(PolicyKey.MEMBER, true)
}

