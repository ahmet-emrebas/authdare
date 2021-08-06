import { PolicyKey } from '.';
import { IRole } from './i-role';
import { Policy } from './policy';

/**
 * Enforce one or more roles for the resource path
 * @value IRole[]
 * @returns CustomDecorator<string>
 */
export function EnforceRolesPolicy(roles: IRole[]): Policy<IRole[]> {
    return new Policy(PolicyKey.SUPER_USER, roles)
}
