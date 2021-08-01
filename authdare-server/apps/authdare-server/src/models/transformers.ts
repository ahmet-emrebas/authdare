import { keys } from 'lodash';
import { genSaltSync, hashSync } from "bcrypt";
import { ClassConstructor, Transform } from "class-transformer";
import { ValueTransformer } from "typeorm";

/**
 * Column Transformer
 */
export const toLocalString: ValueTransformer = {
    to: (value) => value,
    from: (value) => value && new Date(value).toLocaleString()
}

/**
 * Column Transformer
 */
export const hashPassword: ValueTransformer = {
    to: (value) => hashSync(value, genSaltSync(8)),
    from: (value) => value
}

/**
 * Column Transformer
 */
export const toStringArray: ValueTransformer = {
    to: (value) => value && value.join(','),
    from: (value) => value
}


/**
 * Trim string or string array. 
 * @returns 
 */
export const Trim = () => Transform(({ value }) => {
    if (value && typeof value === 'string') {
        return value.trim();
    } else if (typeof value === 'object' && value.length) {
        return value.map(e => e.trim())
    } else {
        return value;
    }
}, { toClassOnly: true })



/**
 * @param c 
 * @returns 
 */
export const FromStringToObject = (itemProperties: string[]) => ({
    to: (listOfItems: any[]) => {
        return listOfItems?.map(e => {
            let stringVersion = [];
            for (let [key, value] of Object.entries(e)) {
                stringVersion.push(value);
            }
            return stringVersion.join(':');
        }).join(',')
    },
    from: (value: string) => {
        const props = value?.split(",").map(e => e.split(':'));
        const objs = props?.map(p => {
            let obj = {};
            let i = 0;
            for (let k of itemProperties) {
                obj[k] = p[i];
                i++
            }
            return obj
        })
        return objs;
    }
})