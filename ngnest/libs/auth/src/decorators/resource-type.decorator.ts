import { PolicyKeys } from './policy-keys';
import { SetMetadata } from '@nestjs/common';

/**
 * Define the resource type like data, auth etc.
 * @param resourceType value of ResourceTypeKeys.x
 * @returns
 */
export function ResourceType(resourceType: string) {
    return SetMetadata(PolicyKeys.RESOURCE_TYPE, resourceType);
}
