/**
 * Elimitate the thrown error and just return the error.
 * @param func
 * @returns
 */
export async function tryCatchError<T>(func: () => Promise<T> | T) {
  try {
    return await func();
  } catch (err) {
    return err;
  }
}

/**
 * Eliminate the thrown error and just return false if error.
 * @param func
 * @returns
 */
export async function tryCatchFalse<T>(func: () => Promise<T> | T) {
  try {
    return await func();
  } catch (err) {
    return false;
  }
}
