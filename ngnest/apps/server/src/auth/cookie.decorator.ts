import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookie = createParamDecorator(function (
  cookieName: string,
  ctx: ExecutionContext,
): string {
  return ctx.switchToHttp().getRequest<Request>().cookies[cookieName];
});
