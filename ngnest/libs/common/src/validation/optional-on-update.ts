import { IsOptional } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ValidationGroups } from '.';

/**
 * Each Validation Decorator will extend this decorator.
 * @returns
 */
export function OptionalOnUpdate() {
    return applyDecorators(IsOptional({ groups: [ValidationGroups.UPDATE] }));
}
