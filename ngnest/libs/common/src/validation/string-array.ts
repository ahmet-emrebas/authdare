import { applyDecorators } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { StringValidator } from './string';
import { StringValidationOptions } from './string-validation.options';
/**
 * Common String array validator
 * @param options
 * @returns
 */
export const StringArrayValidator = (options?: StringValidationOptions) =>
    applyDecorators(ValidateNested({ each: true }), StringValidator(options));
