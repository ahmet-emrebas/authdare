import { ResourcePolicy } from './resource-policy';
import { CustomDecorator, SetMetadata } from '@nestjs/common';


/**
 * Define the resource path as public resource.
 * @returns {CustomDecorator<string>}
 */
export function PublicPolicy(): CustomDecorator<string> {
    return SetMetadata(ResourcePolicy.PUBLIC, true)
}
