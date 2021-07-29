import { Transform } from "class-transformer";
import { isString } from 'class-validator'
import { Like } from "typeorm";

/**
 * PropertyDecorator for removing leading and trailing whitespace or specified characters from string upon plainToClass transfromation.
 * @extends {Transform} class-transformer library
 * @param chars the string to trim.
 * @returns {PropertyDecorator} Returns PropertyDecorator
 */
export function TransformContainsQuery(): PropertyDecorator {
    return Transform(({ value }) => isString(value) ? Like(`%${value}%`) : null);
}

