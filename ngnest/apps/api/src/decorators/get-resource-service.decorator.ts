import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const RESOURCE_SERVICE_KEY = 'RESOURCE_SERVICE_KEY' as any;

export const GetResourceService = createParamDecorator(
  (value: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[RESOURCE_SERVICE_KEY];
  },
);
