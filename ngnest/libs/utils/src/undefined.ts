import { Transform } from "class-transformer";

export function toUndefined(value: any) {
    if (typeof value == 'string' && value.trim() == '') return undefined;
    if (value == null) return undefined;
    return value;
}

/**
 * ClassTransformer
 * @returns undefined if value is an empty string or null, itself otherwise.
 */
export function Undefined() {
    return Transform(toUndefined)
}