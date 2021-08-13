import { ValidationError } from 'class-validator';
import { values } from 'lodash';

/**
 * Transform validation errors to a list of error messages
 * @param errors
 * @returns
 */
export function toErrorMessages(errors: ValidationError[]) {
    return errors.map((e) => values(e.constraints)[0]);
}
