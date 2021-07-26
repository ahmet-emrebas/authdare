import { ResourceService } from './resource.service';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * This is the key of the ResourceService that is stored in the request. You can access it like req[RESOURCE_SERVICE_KEY]. 
 */
export const RESOURCE_SERVICE_KEY = 'mjoiujkjsdfa'

/**
 * Get the resouce service of the resouce and organization
 * @returns {ResouceService}
 */
export function GetResourceService<Entity = any, CreateDTO = any, UpdateDTO = any>(): ParameterDecorator {
    return createParamDecorator((value, context: ExecutionContext): ResourceService<Entity, CreateDTO, UpdateDTO> => {
        const request = context.switchToHttp().getRequest();
        return request[RESOURCE_SERVICE_KEY]
    })
}