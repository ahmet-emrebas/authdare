import { Role } from './role-and-permission';

import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_DECORATOR = 'ROLES_DECORATOR';

/**
 * Add this decorator to the secured routes with specific permissions.
 * @returns {CustomDecorator}
 */
export const Roles = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_DECORATOR, roles);
