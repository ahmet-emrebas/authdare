export class BaseDTO<T>{
    constructor(value: T) { Object.assign(this, value) }
}