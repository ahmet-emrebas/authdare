import { Policies } from './resource-policy';
import { CustomDecorator, SetMetadata } from '@nestjs/common';


/**
 * Define the resource path as public resource by setting the value of PublicPolicy key to true
 * @returns {CustomDecorator<string>}
 */
export function PublicPolicy(): CustomDecorator<string> {
    return SetMetadata(Policies.PUBLIC, true)
}
