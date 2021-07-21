import { yellow } from 'chalk';
import { fromPairs, isArray, isObject, toPairs } from 'lodash';

/**
 * Convert object's array values to comma seperated strings deeply.
 * @param obj
 * @returns
 */
export function toPrintable(obj?: any) {
  const pairs = toPairs(obj || this).map(([k, v]) => {
    if (isArray(v)) {
      v = v.join(',');
    }

    if (!isArray(v) && isObject(v)) {
      v = this.toPrintable(v);
    }
    return [k, v];
  });

  return pairs
    .map((e) => {
      return `\n\t${e[0]}=${e[1]}`;
    })
    .reduce((p, c) => p + c);
}
