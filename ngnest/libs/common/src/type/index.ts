export function t<T>(value?: T): T {
    if (value !== undefined) {
        return undefined as any as T;
    }
    return value as T;
}
