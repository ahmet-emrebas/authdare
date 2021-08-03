import { Exclude } from 'class-transformer';
import { cloneDeep, isEqual } from 'lodash';
import { ImmutableRecord } from './immutable-record';

export type OmitIsEqual<T> = Omit<T, 'isEqual' | 'hazin'>

export class BaseClass<T>{
    constructor(obj?: OmitIsEqual<T>) {
        Object.assign(this, cloneDeep(obj));
    }

    @Exclude()
    isEqual(obj: T) {
        return isEqual(this, obj);
    }

    /**
     * For ImmutableRecord fields only.Check the ImmutableRecord has the value in.
     * Hazin is a Turkish adjective, meaning sad , pathetic, touching etc.
     * @param objectField property name of an ImmutableRecoard in the object. 
     * @param value to look up in the object value.
     * @returns {boolean} true if value found in the object, false otherwise.
     */
    @Exclude()
    hazin<V extends BaseClass<V>>(objectField: keyof OmitIsEqual<T>, value: V): boolean {
        const fieldRef = (this as any)[objectField];
        if (fieldRef) {
            return !!Object.values((this as any)[objectField] as ImmutableRecord<V>)?.find(e => e.isEqual ? e.isEqual(value) : false)
        }
        return false;
    }

}
