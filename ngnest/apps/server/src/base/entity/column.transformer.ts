import { ValueTransformer } from 'typeorm';

/**
 * Converts database field, whose type is string, into array of string
 * @param delimeter
 * @returns
 */
export function readArrayTransformer(
  delimeter = ',',
  isNum?: boolean,
): ValueTransformer {
  return {
    to: (v) => v,
    from: (v) => {
      const r = v.split(delimeter);
      return isNum ? r.map(parseInt) : r;
    },
  };
}

export function readJSONTransformer(): ValueTransformer {
  return {
    to: (v) => v,
    from: (value) => JSON.parse(value),
  };
}

export function hashTransformer(hashFunc: (value: any) => any) {
  return {
    to: (v) => hashFunc(v),
    from: (v) => v,
  };
}
