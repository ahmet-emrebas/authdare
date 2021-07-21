import { createRepository } from '@base';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetResourceService = createParamDecorator(
  async (entity: any, ctx: ExecutionContext) => {
    return await createRepository(
      // ctx.switchToHttp().getRequest().query.orgname,
      'myorgname',
      entity,
    );
  },
);
