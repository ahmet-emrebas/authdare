import { Transform } from "class-transformer";

/**
 * PropertyDecorator for parsing boolean from string of true and false, otherwise return null;
 * @extends {Transform} class-transformer library
 * @returns {PropertyDecorator} Returns PropertyDecorator
 */
export function TransformParseBoolean(): PropertyDecorator {
    return Transform(({ value }) => value == 'true' ? true : value == 'false' ? false : null)
}