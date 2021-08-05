import { classToClass } from 'class-transformer';
import { TransformOptions } from 'class-transformer';
import { KeyValue } from './key-value';
import { Exclude } from 'class-transformer';
import { cloneDeep, isEqual } from 'lodash';
import { validate, ValidationError, ValidationOptions } from 'class-validator';
import { ValidationErrors } from '@angular/forms';

export type OmitBaseMethods<T> = Omit<T, 'isEqual' | 'hasIn' | 'toString' | 'findByKey' | 'transformAndValidate'>


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
     * @returns string version of the object
     */
    @Exclude()
    toString() {
        return JSON.stringify(this);
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

    /**
     * Find a value of an item in a field (array field) by key.
     * @param fieldName name of the fiels, which points to an array of key-value object
     * @param key of the object you are looking for
     * @returns the value of the object if found, undefined otherwise
     */
    @Exclude()
    findByKey(objectProperty: keyof OmitBaseMethods<T>, key: string) {
        const fieldRef = (this as any)[objectProperty] as Array<KeyValue>;
        return fieldRef.find(e => e.key == key)?.value;
    }




    @Exclude()
    async transformAndValidate(validationOptions?: ValidationOptions, transformOptions?: TransformOptions): Promise<{
        errors?: ValidationError[] | false
        validatedInstance: T
    }> {
        const transformed = classToClass(this, transformOptions);
        const errors = await validate(transformed, validationOptions);

        if (errors && errors.length > 0) {
            return {
                errors: errors,
                validatedInstance: this as unknown as T
            };
        }
        return {
            errors: false,
            validatedInstance: transformed as unknown as T
        };
    }


}
