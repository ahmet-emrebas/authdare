import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RESOURCE_SERVICE_KEY = 'resource_service';

export const GetResourceService = createParamDecorator(
  (__, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[RESOURCE_SERVICE_KEY];
  },
);
