import { HttpStatus } from '@nestjs/common';

export interface Appendings<T> {
    [name: string]: Body<T, undefined>;
}

/**
 * Response body for all requests.
 */
export interface Body<T, A> {
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

export interface Repo<T, A, Q> {
    findOne(query: Q): Promise<Body<T, A>>;
    findMany(query: Q): Promise<Body<T[], A>[]>;
    query(query: string | number): Promise<Body<T[], A>>;
    post(body: T): Promise<Body<T, A>>;
    patch(id: number, updated: Partial<T>): Promise<Body<T, A>>;
    delete(id: number): Promise<Body<T, A>>;
}

export interface Hash {
    hash(value: any): Promise<string>;
    verify(hashValue: string, rawValue: string): Promise<boolean>;
}
