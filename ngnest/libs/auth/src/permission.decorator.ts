import { SetMetadata } from '@nestjs/common';

export const PERMISSION = 'PERMISSION';

/**
 *
 * @param {string[]} permissions
 * @returns
 */
export const Permission = (...permissions: string[]) =>
  SetMetadata(PERMISSION, permissions);
