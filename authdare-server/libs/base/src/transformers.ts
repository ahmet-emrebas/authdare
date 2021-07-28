import { Transform } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { fromPairs, split } from 'lodash'
import { Like } from 'typeorm';


/**
 * Transform string with delimeter to array.
 * @param delimeter string default value ","
 * @returns 
 */
export const ToArray = (delimeter: string = ',') => Transform(({ value }) => isNotEmpty(value) && split(value, delimeter), { toClassOnly: true })


/**
 *  Convert a test like "name:ahmet,org:myorg" to {name:ahmet, org:myorg}
 * @param mainDelimeter 
 * @param subDelimeter 
 * @returns 
 */
export const ToObject = () => Transform(({ value }) => { return isNotEmpty(value) && fromPairs(split(value, ',')?.map(e => e?.split(":"))) }, { toClassOnly: true })

/**
 * Convert where string to where object where=name:xyz --> {where:{name:LIke(xyz)}}
 * @returns 
 */
export const ToWhereLike = () => Transform(({ value }) => {
    return isNotEmpty(value) && fromPairs(split(value, ',')?.map(e => e.split(":"))?.map(e => { e[1] = Like(`${e[1]}%`) as unknown as string; return e; }))
}, { toClassOnly: true })

/**
 * Convert the value to boolean
 * @returns 
 */
export const ToBoolean = () => Transform(({ value }) => !!value, { toClassOnly: true })
