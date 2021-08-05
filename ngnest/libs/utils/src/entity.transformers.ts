import { genSaltSync, hashSync } from "bcrypt";

/**
 * Column Transformer
 */
export const HashPassword = () => ({
    to: (value: any) => value && hashSync(value, genSaltSync(8)) || null,
    from: (value: string) => value
})

/**
 * Column Transformer
 */
export const Stringify = () => ({
    to: (value: any) => JSON.stringify(value),
    from: (value: string) => JSON.parse(value)
})
