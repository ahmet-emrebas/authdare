import { PolicyKey } from './policy.key';
import { Policy } from "./policy";


/**
 * Enforce one or more permissions for the resouce path by setting the value of MemberPolicy key to true
 * @returns {CustomDecorator<string>}
 */
export function EnforceMemberPolicy(): Policy<boolean> {
    return new Policy(PolicyKey.MEMBER, true)
}

