import { LessThan, Like, MoreThan } from 'typeorm';
import { Transform, TransformOptions } from 'class-transformer';

/**
 * Transform string to SQL query LIKE
 * @param options 
 * @returns 
 */
export function TLikeContains(options?: TransformOptions) {
    return Transform(({ value }) => Like(`%${value}%`));
}
/**
 * Transform string to SQL query LIKE
 * @param options 
 * @returns 
 */
export function TLikeStartWith(options?: TransformOptions) {
    return Transform(({ value }) => Like(`${value}%`));
}

/**
 * Transform string to SQL query LIKE
 * @param options 
 * @returns 
 */
export function TLikeEndWith(options?: TransformOptions) {
    return Transform(({ value }) => Like(`${value}%`));
}


/**
 * Transform Date string to LessThan Query which means afte the date.
 * @param options 
 * @returns 
 */
export function TLessThan(options?: TransformOptions) {
    return Transform(({ value }) => LessThan(new Date(value)));
}
/**
 * Transform Date string to LessThan Query which means afte the date.
 * @param options 
 * @returns 
 */
export function TMoreThan(options?: TransformOptions) {
    return Transform(({ value }) => MoreThan(new Date(value)));
}
