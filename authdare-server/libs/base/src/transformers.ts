import { Transform, } from 'class-transformer';
import { fromPairs, split } from 'lodash'
import { Between, Like } from 'typeorm';


/**
 * Transform string with delimeter to array.
 * @param delimeter string default value ","
 * @returns 
 */
export const ToArray = (delimeter: string = ',') => Transform(({ value }) => split(value, delimeter), { toClassOnly: true })


/**
 *  Convert a test like "name:ahmet,org:myorg" to {name:ahmet, org:myorg}
 * @param mainDelimeter 
 * @param subDelimeter 
 * @returns 
 */
export const ToObject = () => Transform(({ value }) => {
    return fromPairs(split(value, ',').map(e => e?.split(":")))
}, { toClassOnly: true })


export const ToWhereLike = () => Transform(({ value }) => {
    return fromPairs(split(value, ',').map(e => e.split(":")).map(e => {
        e[1] = Like(`${e[1]}%`) as unknown as string;
        return e;
    }))
}, { toClassOnly: true })

/**
 * Convert the value to boolean
 * @returns 
 */
export const ToBoolean = () => Transform(({ value }) => !!value, { toClassOnly: true })