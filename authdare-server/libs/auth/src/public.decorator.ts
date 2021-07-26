import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_DECORATOR = 'PUBLIC_DECORATOR';

/**
 * Add this decorator to the public routes like @Public() ping(){}.
 * @returns {CustomDecorator}
 */
export const Public = (): CustomDecorator =>
  SetMetadata(PUBLIC_DECORATOR, PUBLIC_DECORATOR);
