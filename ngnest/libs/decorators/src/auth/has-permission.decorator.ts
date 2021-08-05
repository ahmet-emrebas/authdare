import { AuthDecoratorTokens } from './auth-decorator-tokens';
import { IPermission, IRole } from '@authdare/interfaces';
import { SetMetadata, CustomDecorator } from '@nestjs/common';

/**
 * Resource security decorator. 
 * @returns {CustomDecorator<string>}
 */
export function HasPermission(permissions: IPermission[]): CustomDecorator {
    return SetMetadata(AuthDecoratorTokens.HasPermissionToken, permissions)
}

