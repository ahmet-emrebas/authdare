import { TransformOptions } from 'class-transformer';
import { Transform } from 'class-transformer';
import { snakeCase } from 'lodash';
export function SnakeCase(options?: TransformOptions) {
    return Transform(({ value }) => value && typeof value == 'string' && snakeCase(value))
}
