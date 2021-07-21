import { splitBy } from '@base';
import { Transform, TransformOptions } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { fromPairs, toUpper, trim } from 'lodash';

/**
 * Transform comma seperated string into array
 * @param delimeter
 * @param options
 * @returns
 */
export function TransformFromStringToArray(
  delimeter = ',',
  options: TransformOptions = { toClassOnly: true },
) {
  return Transform(
    ({ value }) => value?.split(delimeter).map(trim).filter(isNotEmpty),
    options,
  );
}

/**
 * Transform comma seperated string into array
 * @param delimeter
 * @param options
 * @returns
 */
export function TransformFromArrayToString(
  delimeter = ',',
  options: TransformOptions = { toClassOnly: true },
) {
  return Transform(
    ({ value }) => value?.map(trim).filter(isNotEmpty).join(delimeter),
    options,
  );
}

export function TransformFromStringToObject(
  mainDelimeter = ',',
  keyValueDemiter = ':',
  options: TransformOptions = {
    toClassOnly: true,
  },
) {
  return Transform(({ value }) => {
    if (!value || typeof value !== 'string') {
      return null;
    }

    const transformed = fromPairs(
      value
        .split(mainDelimeter)
        .map(trim)
        .map(splitBy(keyValueDemiter))
        .map((e) => [e[0], toUpper(e[1])]),
    );
    return transformed;
  }, options);
}
