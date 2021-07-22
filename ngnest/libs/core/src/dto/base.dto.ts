
/**
 * Each Dto class extends this class 
 */
export class BaseDto<T> {
    constructor(obj: T) {
        Object.assign(this, obj);
    }
}