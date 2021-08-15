import { ILike } from 'typeorm';

/**
 * Transform "&" seperated key-value pairs like firstName=ahmet&lastName=Emrebas&role=Lead Architect into database Like Query for typeorm columns.
 * @param query
 * @returns
 */
export function toORILikeContains(query: string) {
    return query?.split('&').map((e) => ({ string: ILike(`%${e}%`) }));
}

export function toILikeExactAny(query: string) {
    return query?.split('&').map((e) => ({ string: ILike(`${e}`) }));
}
