import { ValueTransformer } from 'typeorm';

/**
 * Column Transformer
 * @returns ValueTransformer
 */
export function jsonTransformer(): ValueTransformer {
    return {
        to: (value) => {
            try {
                return JSON.stringify(value);
            } catch (err) {
                console.error(err);
                return `Could not stringify the object ${value} to string`;
            }
        },
        from: (value) => {
            try {
                return JSON.parse(value);
            } catch (err) {
                console.error(err);
                return { error: `Could not parse <${value}> to JSON Object` };
            }
        },
    };
}
