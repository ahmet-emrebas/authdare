import { Transform } from "class-transformer";
import { trim } from 'lodash'

/**
 * PropertyDecorator for removing leading and trailing whitespace or specified characters from string upon plainToClass transfromation.
 * @extends {Transform} class-transformer library
 * @param chars the string to trim.
 * @returns {PropertyDecorator} Returns PropertyDecorator
 */
export function TransformTrim(chars?: string): PropertyDecorator {
    return Transform(({ value }) => trim(value, chars));
}