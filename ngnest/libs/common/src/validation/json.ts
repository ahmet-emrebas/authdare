import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { OptionalOnUpdate } from './optional-on-update';

export function JSONValidator(options?: Record<string, any>) {
    return applyDecorators(ApiProperty(), OptionalOnUpdate(), IsObject());
}
