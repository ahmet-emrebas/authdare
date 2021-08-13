import { HandlerOptionsToken, IResourcePolicyOptions } from '@authdare/common/decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Check user has a valid session
 */
@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const resourceName = this.reflector.get('path', context.getClass());
        const handlerPath = context.getHandler().name;
        const method = req.method;

        console.log(`${method}  : ${resourceName} ---> ${handlerPath} `);

        const options = this.reflector.getAllAndOverride<IResourcePolicyOptions>(
            HandlerOptionsToken,
            [context.getClass(), context.getHandler()],
        );

        console.log(options);

        if (options.public) {
            return true;
        }

        return true;
    }
}
