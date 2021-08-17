import { StringValidationOptions } from './string-validation.options';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Contains, IsString, Length, Matches, NotContains } from 'class-validator';
import { merge } from 'lodash';
import { validateOptions } from './validate-options';
import { OptionalOnUpdate } from './optional-on-update';

/**
 * Common String validator.
 * @param options
 * @returns
 */
export function StringValidator(options?: Partial<StringValidationOptions>) {
    if (options) validateOptions(options);

    const { min, max, notContains, contains, startWith, endWith } = merge(
        new StringValidationOptions(),
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
