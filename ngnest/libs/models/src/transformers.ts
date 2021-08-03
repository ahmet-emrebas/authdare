import { genSaltSync, hashSync } from 'bcrypt';
import { Transform, TransformOptions } from 'class-transformer';
import { Like, ValueTransformer } from 'typeorm';


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
 * Trim transformer for DTO fields.
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
 * ToJSONstring transformer for entity column
 * @param c
 * @returns
 */
export const JSONToString = () => ({
  to: (listOfItems: any[]) => JSON.stringify(listOfItems),
  from: (value: string) => JSON.parse(value),
});

/**
 * LikeQuery transformer for DTO fields.
 * @param options 
 * @returns 
 */
export const LikeQuery = (options?: TransformOptions) => Transform(({ value }) => (value && value.length > 0) && Like(`%${value}%`), options)


/**
 * ParseInt Tranfroemr for DTO fields.
 * @param options 
 * @returns 
 */
export const ParseInt = (options?: TransformOptions) => Transform(({ value }) => value && parseInt(value));




export const Split = (delimeter: string, options?: TransformOptions) => Transform(({ value }) => (value && typeof value == 'string') && value.split(delimeter) || [])