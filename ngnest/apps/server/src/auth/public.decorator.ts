import { SetMetadata } from '@nestjs/common';

export const PUBLIC_DECORATOR = 'PUBLIC_DECORATOR';
export function Public(...args: string[]) {
  return SetMetadata(PUBLIC_DECORATOR, args);
}
