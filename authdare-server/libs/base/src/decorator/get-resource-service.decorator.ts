import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RESOURCE_SERVICE_KEY = "RESOURCE_SERVICE_KEY";

export const GetResourceService = createParamDecorator((value, context: ExecutionContext) => {
    const resourceService = context.switchToHttp().getRequest()[RESOURCE_SERVICE_KEY]
    return
})