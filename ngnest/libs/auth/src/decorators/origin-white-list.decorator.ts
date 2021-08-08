import { PolicyKeys } from './policy-keys';
import { SetMetadata } from '@nestjs/common';

/**
 * Allow the requests from these domains only.
 * @returns CustomDecorator<string>
 */
export function OriginWhiteList(domains: string[]) {
    return SetMetadata(PolicyKeys.ORIGIN_WHITE_LIST, domains);
}
