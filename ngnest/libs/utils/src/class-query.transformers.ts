import { isNotEmpty } from 'class-validator';
import { LessThan, Like, MoreThan } from 'typeorm';
import { Transform, TransformOptions } from 'class-transformer';
import { isString } from 'lodash';

export function __likeContains(value: any) {
    return isNotEmpty(value) && isString(value)
        ? Like(`%${value}%`)
        : undefined;
}

export function __likeStartsWith(value: any) {
    return isNotEmpty(value) && isString(value) ? Like(`${value}%`) : undefined;
}

export function __likeEndsWith(value: any) {
    return isNotEmpty(value) && isString(value) ? Like(`%${value}`) : undefined;
}

export function __lessThan(value: any) {
    return isNotEmpty(value) ? LessThan(new Date(value)) : undefined;
}

export function __moreThan(value: any) {
    return isNotEmpty(value) ? MoreThan(new Date(value)) : undefined;
}

/**
 * Transform string to SQL query LIKE
 * @param options
 * @returns
 */
export function TLikeContains(options?: TransformOptions) {
    return Transform(({ value }) => __likeContains(value), options);
}

/**
 * Transform string to SQL query LIKE
 * @param options
 * @returns
 */
export function TLikeStartWith(options?: TransformOptions) {
    return Transform(({ value }) => __likeStartsWith(value), options);
}

/**
 * Transform string to SQL query LIKE
 * @param options
 * @returns
 */
export function TLikeEndWith(options?: TransformOptions) {
    return Transform(({ value }) => __likeEndsWith(value), options);
}

/**
 * Transform Date string to LessThan Query which means afte the date.
 * @param options
 * @returns
 */
export function TLessThan(options?: TransformOptions) {
    return Transform(({ value }) => __lessThan(value), options);
}
/**
 * Transform Date string to LessThan Query which means afte the date.
 * @param options
 * @returns
 */
export function TMoreThan(options?: TransformOptions) {
    return Transform(({ value }) => __moreThan(value), options);
}
