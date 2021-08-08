import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid';

/**
 * Define the type of the resource.
 */
export const ResourceTypeTokens = ImObject({
    AUTH: uuid(),
    DATA: uuid(),
});
