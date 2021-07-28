import { UserEntity } from "@authdare/models";
import { Logger } from '@nestjs/common';
import { Request, Response } from "express";

export enum COOKIE_KEYS {
    /**
     * User role 
     */
    AUTH_COOKIE = '__Love_Is_A__Verb',


    /**
     * Interests of the client 
     */
    INTERESTS_COOKIE = '__What_Do_you_Like__',
}

export type AuthCookieType = {

    id: number;
    email: string;
    active: boolean;
    org: { name: string },
    roles: { name: string }[]
}

/**
 * Transform user data to store in cookie.
 * @param {UserEntity}user 
 * @returns 
 */
export function userToCookie(user: UserEntity): AuthCookieType {
    return {
        id: user.id,
        email: user.email,
        active: user.active,
        org: { name: user.org.name },
        roles: user.roles.map(e => ({ name: e.name }))
    }
}



export function setCookie(res: Response, key: COOKIE_KEYS, value: string) {
    if (value.length > 3000)
        Logger.error(`There is a cookie problem with the cookie key, ${key}. Length is greater than 3000`)
    res.cookie(key, value);
}


export function getCookie(req: Request, key: COOKIE_KEYS) {
    return req.cookies[key];
}


export function clearCookie(res: Response, key: COOKIE_KEYS) {
    res.clearCookie(key);
}