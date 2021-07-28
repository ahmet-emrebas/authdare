export class BaseDTO<T> {
  id?: number;
  constructor(value?: T) {
    Object.assign(this, value);
  }
}
