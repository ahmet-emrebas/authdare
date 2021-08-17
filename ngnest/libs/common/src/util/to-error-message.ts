import { ValidationError } from '@nestjs/common';
import { flatten, values } from 'lodash';
/**
 * Pick the validation error messages and return as an array of string.
 * @param errors ValidationError[]
 * @returns
 */
export function toErrorMessages(errors: ValidationError[]): string[] {
    return flatten(errors.map((e) => values(e.constraints)));
}
