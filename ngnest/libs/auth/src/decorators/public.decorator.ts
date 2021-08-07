import { PolicyKeys } from './policy-keys';
import { SetMetadata } from '@nestjs/common';

/**
 * Allow any user to access to this resource
 * @returns CustomDecorator<string>
 */
export function PublicPolicy() {
    return SetMetadata(PolicyKeys.PUBLIC, true);
}
