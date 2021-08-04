import { Exclude } from 'class-transformer';
import { cloneDeep, isEqual } from 'lodash';

export type OmitBaseMethods<T> = Omit<T, 'isEqual' | 'hasIn'>


export class BaseClass<T> {

    /**
     * Constructor saves properties by value deeply. Does not mutate the parameter object.  
     * @param obj T
     */
    constructor(obj: OmitBaseMethods<T>) {
        Object.assign(this, cloneDeep(obj));
    }

    /**
     * Check the objects are equal or not deeply
     * @param obj 
     * @returns {boolean} true if objects are the same, false otherwise. 
     */
    @Exclude()
    isEqual(obj: T): boolean {
        return isEqual(this, obj);
    }

    /**
     * Check value exist the the the objectField (assuming it is an array).
     * @param objectField 
     * @param value 
     * @returns 
     */
    @Exclude()
    hasIn<V extends BaseClass<V>>(objectField: keyof OmitBaseMethods<T>, value: V): boolean {
        const fieldRef = (this as any)[objectField] as Array<V>;
        if (fieldRef) {
            return !!fieldRef.find(e => e.isEqual(value))
        }
        return false;
    }

}
