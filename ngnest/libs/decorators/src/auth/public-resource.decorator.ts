import { AuthDecoratorTokens } from './auth-decorator-tokens';
import { CustomDecorator, SetMetadata } from '@nestjs/common';
/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function PublicResource(): CustomDecorator<string> {
    return SetMetadata(AuthDecoratorTokens.PublicResourceToken, true)
}
