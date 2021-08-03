
export function message(message: string, extra?: { [key: string]: any }) {
    return { message, ...extra }
}