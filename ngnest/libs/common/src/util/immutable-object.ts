/**
 * Freezed object
 * @param obj
 * @returns
 */
export function IM<T extends object = any>(obj: T) {
    Object.freeze(obj);
    return obj;
}
