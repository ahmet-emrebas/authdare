export interface IGet<T> {
    get(): T | Promise<T>;
}
