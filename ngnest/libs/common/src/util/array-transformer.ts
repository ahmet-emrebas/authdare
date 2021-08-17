import { ValueTransformer } from 'typeorm';

/**
 * Column Transformer
 * @returns ValueTransformer
 */
export function arrayTransformer(): ValueTransformer {
    return {
        to: (value) => {
            try {
                return value?.join('#!@&#!#');
            } catch (err) {
                console.error(err);
                return `Could not stringify the Array object ${value} to string`;
            }
        },
        from: (value) => {
            try {
                return value?.split('#!@&#!#');
            } catch (err) {
                console.error(err);
                return { error: `Could not parse <${value}> to Array Object` };
            }
        },
    };
}
