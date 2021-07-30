import { ClassConstructor } from 'class-transformer';
import { snakeCase, trimEnd, capitalize } from 'lodash';

export function resourceName<T = any>(clazz: ClassConstructor<T>) {
    return capitalize(trimEnd(snakeCase(clazz.name), '_entity'));
}