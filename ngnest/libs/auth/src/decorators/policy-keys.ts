import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid';

export const PolicyKeys = ImObject({
    /**
     * Auth session will be stored in the session with this key
     */
    PUBLIC: uuid(),

    /**
     * User PERMISSIONS will be stored in session with this key
     */
    PERMISSION: uuid(),
});
