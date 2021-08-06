import { PolicyKey } from './policy.key';
import { Policy } from "./policy";

/**
 * Dynamic policy is not stored in the session. 
 * If dynamic policy is enforced, then we will go get the infromation about the policy in database, then execute the dynamic content.
 * @returns {CustomDecorator<string>}
 */
export function EnforceDynamicPolicy(): Policy<boolean> {
    return new Policy(PolicyKey.DYNAMIC, true)
}

