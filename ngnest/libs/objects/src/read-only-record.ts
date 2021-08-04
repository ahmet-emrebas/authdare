
/**
 * Immutable Record for types. The fields are stil muteable 
 */
export interface ReadonlyRecord<T> {
    readonly [key: string]: T
}
