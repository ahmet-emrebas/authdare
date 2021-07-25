import { cloneDeep } from 'lodash';

/**
 * Each Dto class extends this class
 */
export class BaseDto<T> {
  constructor(obj?: Partial<T>) {
    Object.assign(this, cloneDeep(obj));
  }
}
