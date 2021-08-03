import { Transform } from "class-transformer";

export function toUndefined(value: any) {
    if (typeof value == 'string' && value.trim() == '') return undefined;
    if (value == null) return undefined;
    return value;
}

export function Undefined() {
    return Transform(toUndefined)
}