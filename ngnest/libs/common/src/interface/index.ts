import { HttpStatus } from '@nestjs/common';

/**
 * Response body for all requests.
 */
export interface ResponseBody<T, A> {
    event: string;
    message: string;
    resource: string;
    statusCode: HttpStatus;
    viewComponent: string;
    fields: string[];
    count: number;
    appendings: Appendings<A>;
    data: T;
}

export interface Appendings<T> {
    [name: string]: ResponseBody<T, undefined>;
}

export interface Repo<T, A, Q> {
    findOne(query: Q): Promise<ResponseBody<T, A>>;
    findMany(query: Q): Promise<ResponseBody<T[], A>[]>;
    query(query: string | number): Promise<ResponseBody<T[], A>>;
    post(body: T): Promise<ResponseBody<T, A>>;
    patch(id: number, updated: Partial<T>): Promise<ResponseBody<T, A>>;
    delete(id: number): Promise<ResponseBody<T, A>>;
}

export interface Hash {
    hash(value: any): Promise<string>;
    verify(hashValue: string, rawValue: string): Promise<boolean>;
}
