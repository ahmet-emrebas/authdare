
/**
 * Frozen object used as Enum
 * @param obj 
 * @returns 
 */
export function ImObject<T = any>(obj: T): T {
    Object.freeze(obj);
    Object.seal(obj);
    return obj;
}