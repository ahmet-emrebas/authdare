import { isNotEmpty } from 'class-validator';
import { LessThan, Like, MoreThan } from 'typeorm';
import { Transform, TransformOptions } from 'class-transformer';
import { isString } from 'lodash';

function __likeContains(value: any) {
    return isNotEmpty(value) && isString(value) && Like(`%${value}%`);
}

function __likeStartsWith(value: any) {
    return isNotEmpty(value) && isString(value) && Like(`${value}%`);
}

function __likeEndsWith(value: any) {
    return isNotEmpty(value) && isString(value) && Like(`${value}%`);
}

function __lessThan(value: any) {
    return isNotEmpty(value) && isString(value) && LessThan(new Date(value));
}

function __moreThan(value: any) {
    return isNotEmpty(value) && isString(value) && MoreThan(new Date(value));
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
