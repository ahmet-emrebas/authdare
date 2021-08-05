import { genSaltSync, hashSync } from "bcrypt";

/**
 * Column Transformer
 */
export const HashPassword = () => ({
    to: (value: any) => hashSync(value, genSaltSync(8)),
    from: (value: string) => value
})
