import { UnprocessableEntityException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { parseInt, trim } from 'lodash';
import { Between, Like, MoreThan } from 'typeorm';

/**
 * Transform comma seperated string into Between query when two arguments passed,
 * MoreThan query when one argument passed.
 * @param {string} value commo separated string "a,b";
 * @return Between(date, date);
 */
export function toDateBetween(value: string) {
  if (!value) {
    return;
  }

  const arr = value
    .split(',')
    .map((e) => e.replace(/T|\.000Z/, ' '))
    .map(trim)
    .sort();

  const first = arr[0];
  const second = arr[1];

  if (second) {
    return Between(first, second);
  } else {
    return MoreThan(first);
  }
}

/**
 * Transform pair of strings to Between query
 * @returns
 */
export function TransformDateBetween() {
  return Transform(({ value }) => toDateBetween(value), { toClassOnly: true });
}

/**
 *
 * @param {string} value
 * @returns Like(%value%)
 */
export function toStringLike(value: string) {
  return value && Like(`%${value}%`);
}

/**
 * Transform string to Like query
 * @returns Transform(Like);
 */
export function TransformStringLike() {
  return Transform(({ value }) => toStringLike(value), { toClassOnly: true });
}

/**
 * Transform "10,10" into [10, 20] and generate the Between query
 * @param value comma seperated numbers
 * @returns
 */
export function toNumberBetween(value: string) {
  value = value?.trim();
  if (!value) {
    return null;
  }

  let splitted: number[];

  try {
    splitted = value.split(',').map(trim).filter(isNotEmpty).map(parseInt);
  } catch (err) {
    throw new UnprocessableEntityException(
      `${value} should be comma seperated numbers`,
    );
  }
  const [first, second] = splitted;

  if (!second) {
    return MoreThan(splitted[0]);
  }
  return Between(first, second);
}
/**
 * Transform comma seperated string into Between query
 * @returns
 */
export function TransformNumberBetween() {
  return Transform(({ value }) => toNumberBetween(value));
}
