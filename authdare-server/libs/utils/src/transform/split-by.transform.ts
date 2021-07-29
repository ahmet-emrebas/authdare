
import { Transform } from "class-transformer";

/**
 * PropertyDecorator for spllitting string by delimeter upon plainToClass transfromation
 * @extends {Transform} class-transformer library
 * @param chars the string to trim.
 * @returns {PropertyDecorator} Returns PropertyDecorator
 */
export function TransformSplitBy(delimenter: string = ','): PropertyDecorator {
    return Transform(({ value }) => {
        return value && typeof value == 'string' && value.split(',') || value
    }, { toClassOnly: true });
}