import { PolicyKey } from './policy.key';
import { Policy } from './policy';


/**
 * Define the resource path as public resource by setting the value of PublicPolicy key to true
 * @value boolean
 * @returns {CustomDecorator<string>}
 */
export function PublicPolicy(): Policy<boolean> {
    return new Policy(PolicyKey.PUBLIC, true)
}
