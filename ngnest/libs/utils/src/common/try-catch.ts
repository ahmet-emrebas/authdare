
/**
 * Elimitate the thrown error and just return the error.
 * @param func 
 * @returns 
 */
export async function tryCatch<T>(func: () => Promise<T>) {
    try {
        return await func();
    } catch (err) {
        return err;
    }

}