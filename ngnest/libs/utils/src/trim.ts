import { Transform, TransformOptions } from "class-transformer";

export const _trim = (value: any) => value && typeof value == 'string' && value.trim() || undefined

export const _trim_each = (value: any) => value && typeof value == 'object' && value.map && value.map((e: string) => _trim(e))

/**
 * 
 * @param C 
 * @param options 
 * @returns 
 */
export function Trim(options?: TransformOptions) {
    return Transform(({ value }) => _trim(value), options)
}


export function TrimEach(options?: TransformOptions) {
    return Transform(({ value }) => _trim_each(value), options)
}