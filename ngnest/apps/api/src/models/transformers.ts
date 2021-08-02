import { genSaltSync, hashSync } from 'bcrypt';
import { Transform } from 'class-transformer';
import { ValueTransformer } from 'typeorm';

/**
 * Column Transformer, transform toLocalDateTime string.
 */
export const toLocalString: ValueTransformer = {
  to: (value) => value,
  from: (value) => value && new Date(value).toLocaleString(),
};

/**
 * Column Transformer
 */
export const hashPassword: ValueTransformer = {
  to: (value) => hashSync(value, genSaltSync(8)),
  from: (value) => value,
};

/**
 * Column Transformer
 */
export const toStringArray: ValueTransformer = {
  to: (value) => value && value.join(','),
  from: (value) => value,
};

/**
 * Trim string/string[]
 * @param value
 * @returns
 */
export function trimStringAndArray(value: any) {
  if (value && typeof value === 'string') {
    return value.trim();
  } else if (typeof value === 'object' && value.length) {
    return value.map((e: string) => e.trim());
  } else {
    return value;
  }
}

/**
 * Trim string or string array.
 * @returns
 */
export const Trim = () =>
  Transform(
    ({ value }) => {
      return trimStringAndArray(value);
    },
    { toClassOnly: true },
  );

/**
 * Entity column transformer
 * @param c
 * @returns
 */
export const JSONToString = () => ({
  to: (listOfItems: any[]) => JSON.stringify(listOfItems),
  from: (value: string) => JSON.parse(value),
});
