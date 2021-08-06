import { PolicyKey } from './policy.key';
import { Policy } from './policy';


/**
 * Tell the authenticator that resource/resources require SuperUser privilige. 
 * @value boolean
 * @returns CustomDecorator<string>
 */
export function SuperUserPolicy(): Policy<boolean> {
    return new Policy(PolicyKey.SUPER_USER, true)
}

