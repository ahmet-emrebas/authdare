import { CreateUserDto } from '@authdare/models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extract the user property from request and return it.
 */
export const GetAuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as CreateUserDto;
})