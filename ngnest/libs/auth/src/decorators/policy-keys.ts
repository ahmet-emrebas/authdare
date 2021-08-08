import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid';

export const PolicyKeys = ImObject({
    /**
     * This key will be used by Policy Decorators to define the resource policy and enforcements.
     */
    PUBLIC: uuid(),

    /**
     *  This key will be used by Policy Decorators to define the resource policy and enforcements.
     */
    PERMISSION: uuid(),

    /**
     * This key will be used by Policy Decorators to define the resource policy and enforcements.
     */
    RESOURCE_TYPE: uuid(),

    /**
     * This key will be used by Policy Decorators to define the resource policy and enforcements.
     */
    ORIGIN_WHITE_LIST: uuid(),
});
