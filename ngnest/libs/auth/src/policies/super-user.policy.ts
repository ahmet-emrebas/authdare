import { PolicyKey } from './policy.key';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IRole } from './i-role';
import { Policy } from './policy';



/**
 * Tell the authenticator that resource/resources require SuperUser privilige. 
 * @value boolean
 * @returns CustomDecorator<string>
 */
export function SuperUserPolicy(roles: IRole[]): Policy<boolean> {
    return new Policy(PolicyKey.SUPER_USER, true)
}

