import { Transform, TransformOptions } from "class-transformer";

export const _trim = (value: any) => value && typeof value == 'string' && value.trim() || undefined

export const _trim_each = (value: any) => value && typeof value == 'object' && value.map && value.map((e: string) => _trim(e))

/**
 * Trim string transformer, transform to undefined if it is an empty string or not a string
 * @param C 
 * @param options 
 * @returns 
 */
export function Trim(options?: TransformOptions) {
    return Transform(({ value }) => _trim(value), options)
}

/**
 * Trim string transformer for array of string, transform to undefined if it is an empty string or not a string
 * @param options 
 * @returns 
 */
export function TrimEach(options?: TransformOptions) {
    return Transform(({ value }) => _trim_each(value), options)
}