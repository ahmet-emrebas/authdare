import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
    Contains,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Matches,
    NotContains,
    ValidateNested,
    validateSync,
    ValidationError,
} from 'class-validator';
import { flatten, values, merge } from 'lodash';
import { ValidationGroups } from '../class';

class StringValidatorOptions {
    @IsNumber() min = 0;
    @IsNumber() max = 400;
    @StringValidator() notContains = 'fuck | ass | bitch';
    @StringValidator() contains = '';
    @StringValidator() startWith = '';
    @StringValidator() endWith = '';
}

/**
 * Pick the validation error messages and return as an array of string.
 * @param errors ValidationError[]
 * @returns
 */
export function toErrorMessages(errors: ValidationError[]): string[] {
    console.log(
        errors.map((e) => {
            return e;
        }),
    );
    return flatten(errors.map((e) => values(e.constraints)));
}

function validateOptions(options: StringValidatorOptions): void {
    if (options) {
        const errors = validateSync(options, { skipMissingProperties: true });
        if (errors && errors.length > 0) {
            throw new Error('\n\t' + toErrorMessages(errors).join('\n\t'));
        }
    }
}

/**
 * Each Validation Decorator will extend this decorator.
 * @returns
 */
export function OptionalOnUpdate() {
    return applyDecorators(IsOptional({ groups: [ValidationGroups.UPDATE] }));
}

/**
 * Common String validator.
 * @param options
 * @returns
 */
export function StringValidator(options?: StringValidatorOptions) {
    if (options) validateOptions(options);

    const { min, max, notContains, contains, startWith, endWith } = merge(
        new StringValidatorOptions(),
        options,
    );

    return applyDecorators(
        ApiProperty(),
        OptionalOnUpdate(),
        IsString(),
        Matches(/^[a-zA-Z]{1,}.*$/, { message: '$property should start with a-z or A-Z' }),
        Matches(new RegExp(`^${startWith}.*`, 'i'), {
            message: `$property should start with ${startWith}`,
        }),
        Matches(new RegExp(`^.*${endWith}$`, 'i'), {
            message: `$property should end with ${startWith}`,
        }),
        Length(min, max),
        NotContains(notContains),
        Contains(contains),
    );
}

/**
 * Common String array validator
 * @param options
 * @returns
 */
export const StringArrayValidator = (options?: StringValidatorOptions) =>
    applyDecorators(ValidateNested({ each: true }), StringValidator(options));

/**
 *
 * Common Password validator
 * @param options
 * @returns
 */
export function PasswordValidator(options?: StringValidatorOptions) {
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
