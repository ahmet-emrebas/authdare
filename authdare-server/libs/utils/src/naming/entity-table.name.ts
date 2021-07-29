import { ClassConstructor } from "class-transformer";
import { snakeCase, trimEnd } from 'lodash'

/**
 * Transform the name of the class to database table name
 * @example  MyTaskEntity will be converted to my_tasks; 
 * @param clazz 
 * @returns 
 */
export function entityTableName(clazz: ClassConstructor<any>) {
    return trimEnd(snakeCase(clazz.name), '_entity') + 's';
}