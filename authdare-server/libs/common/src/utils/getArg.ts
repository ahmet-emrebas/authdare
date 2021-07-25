/**
 * Get the passed node argument by key.
 * @param key of node argument
 * @returns {string}
 */
export function getArg(key: string): string {
    return process.argv
        .map(e => e.split('=')) // [ [a b] , [c d]]
        .filter(e => e.length == 2) //[[a b], [c d]]
        .map(e => ({ [e[0]]: e[1] })) // [{a:b}, {c:d}]
        .reduce((p, c) => ({ ...p, ...c }))[key]
}


