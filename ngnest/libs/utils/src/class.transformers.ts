import { TransformOptions, ClassConstructor, classToClass } from 'class-transformer';
import {} from 'class-transformer';
import { Transform } from 'class-transformer';
import { fromPairs, snakeCase, split } from 'lodash';

export function __initOne<T = any>(C: ClassConstructor<T>, value: any) {
    return classToClass(C, value);
}

export function __initEach<T = any>(C: ClassConstructor<T>, value: any) {
    return (value && typeof value == 'object' && value.map && value?.map((e: T) => classToClass(new C(e)))) || undefined;
}

export function _toUndefined(value: any) {
    if (typeof value == 'string' && value.trim() == '') return undefined;
    if (value == null) return undefined;
    return value;
}

export const _trim = (value: any) => (value && typeof value == 'string' && value.trim()) || undefined;

export const _trim_each = (value: any) => value && typeof value == 'object' && value.map && value.map((e: string) => _trim(e));

/**
 * Initialize each item in the array with the provided class constructor.
 * @param C class constructor
 * @param options TransformOptions
 * @returns initialized items of array
 */
export function InitOne<T = any>(C: ClassConstructor<T>, options?: TransformOptions) {
    return Transform(({ value }) => __initOne(C, value), options);
}
/**
 * Initialize each item in the array with the provided class constructor.
 * @param C class constructor
 * @param options TransformOptions
 * @returns initialized items of array
 */
export function InitEach<T = any>(C: ClassConstructor<T>, options?: TransformOptions) {
    return Transform(({ value }) => __initEach(C, value), options);
}

/**
 * Class Transformer
 * @param options
 * @returns
 */
export function SnakeCase(options?: TransformOptions) {
    return Transform(({ value }) => value && typeof value == 'string' && snakeCase(value), options);
}

/**
 * ClassTransformer
 * @returns undefined if value is an empty string or null, itself otherwise.
 */
export function Undefined() {
    return Transform(_toUndefined);
}

/**
 * Trim string transformer, transform to undefined if it is an empty string or not a string
 * @param C
 * @param options
 * @returns
 */
export function Trim(options?: TransformOptions) {
    return Transform(({ value }) => _trim(value), options);
}

/**
 * Trim string transformer for array of string, transform to undefined if it is an empty string or not a string
 * @param options
 * @returns
 */
export function TTrimEach(options?: TransformOptions) {
    return Transform(({ value }) => _trim_each(value), options);
}

export function TSplitBy(delimeter = ',', options?: TransformOptions) {
    return Transform(({ value }) => value && typeof value == 'string' && value.split(delimeter), options);
}

export function TParseBool(options?: TransformOptions) {
    return Transform(
        ({ value }) => value && typeof value == 'string' && (value == 'true' ? true : value == 'false' ? false : undefined),
        options,
    );
}

export function TObjectify(options?: TransformOptions) {
    return Transform(({ value }) => value && typeof value == 'string' && fromPairs(split(value, ',')?.map((e) => e?.split(':'))), options);
}
