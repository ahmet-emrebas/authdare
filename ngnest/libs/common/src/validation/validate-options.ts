import { StringValidationOptions } from './string-validation.options';
import { validateSync } from 'class-validator';
import { toErrorMessages } from '../util';

export function validateOptions(options: Partial<StringValidationOptions>): void {
    if (options) {
        const errors = validateSync(options, { skipMissingProperties: true });
        if (errors && errors.length > 0) {
            throw new Error('\n\t' + toErrorMessages(errors).join('\n\t'));
        }
    }
}
