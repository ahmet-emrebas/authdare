import { AuthDecoratorTokens } from './auth-decorator-tokens';
import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IRole } from '@authdare/interfaces';

/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function HasRole(roles: IRole[]): CustomDecorator<string> {
    return SetMetadata(AuthDecoratorTokens.HAS_ROLE_TOKEN, roles)
}
