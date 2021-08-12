/**
 * Pick deep values from object.
 * @example {a : { b : { c : { d: { name: "Ahmet"}}}}} ---> pickValue(obj, 'a', 'b', 'c', 'd', 'name') ---> Ahmet
 */
export function pickValue<R = any>(obj: Record<string, any>, ...keyChain: string[]): R {
    const key = keyChain.shift();
    return key ? (obj ? pickValue(obj[key], ...keyChain) : (obj as any as R)) : (obj as R);
}
