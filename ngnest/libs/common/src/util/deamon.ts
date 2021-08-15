/**
 * Let the code flow.
 * @param func
 */
export function deamon(func: () => void) {
    setTimeout(async () => {
        try {
            await func();
        } catch (err) {
            console.error(err);
        }
    }, 1000);
}
