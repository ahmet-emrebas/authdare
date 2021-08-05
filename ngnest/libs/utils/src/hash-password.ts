import { genSaltSync, hashSync } from "bcrypt";

/**
 * Column Transformer
 */
export const HashPassword = () => ({
    to: (value: any) => value && hashSync(value, genSaltSync(8)) || null,
    from: (value: string) => value
})
