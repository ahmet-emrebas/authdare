import { genToken } from '@authdare/common';

export const LOGIN_SERVICE_TOKEN = genToken()

export class LoginService {
    /**
     * Find user by credentials, prepare token data, and store them in a token, and return the token
     * @param credentials 
     */
    login<U = any>(credentials: U): Promise<string> {
        throw new Error('Not implemented!');
    }
}