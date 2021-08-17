import { cloneDeep } from 'lodash';

/**
 * Constructor with deep clone which will prevent code from unspable state.
 *
 */
export class CommonConstructor<T> {
    constructor(obj?: T) {
        if (obj) Object.assign(this, cloneDeep(obj));
    }
}
