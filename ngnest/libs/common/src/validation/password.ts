import { StringValidationOptions } from './string-validation.options';
import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';
import { validateOptions } from './validate-options';
import { StringValidator } from './string';

/**
 *
 * Common Password validator
 * @param options
 * @returns
 */
export function PasswordValidator(options?: StringValidationOptions) {
    if (options) validateOptions(options);
    return applyDecorators(
        StringValidator(),
        Matches(/.*\d{1,}.*/, { message: `$property should contain a number` }),
        Matches(/.*\W{1,}.*/, {
            message: `$property should contain a special character`,
        }),
        Matches(/.*[A-Z]{1,}.*/, {
            message: `$property should contain an uppercase letter`,
        }),
        Matches(/.*[a-z]{1,}.*/, {
            message: `$property should contain an lowercase letter`,
        }),
    );
}
