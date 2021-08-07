import { ClassConstructor } from 'class-transformer';
import { SetMetadata } from '@nestjs/common';

export const RESOURCE_ENTITY_CLASS_KEY = 'RESOURCE_ENTITY_CLASS_KEY';
export function ResourceEntity<T = any>(entity: ClassConstructor<T>) {
    return SetMetadata(RESOURCE_ENTITY_CLASS_KEY, entity);
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RESOURCE_REPO_KEY = 'RESOURCE_REPO_KEY';

export const GetResourceRepo = createParamDecorator((__, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[RESOURCE_REPO_KEY];
});
