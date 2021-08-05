
/**
 * Column Transformer
 */
export const Stringify = () => ({
    to: (value: any) => JSON.stringify(value),
    from: (value: string) => JSON.parse(value)
})
