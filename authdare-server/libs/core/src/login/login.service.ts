import { LoginCredentials } from './login-credentials';
import { genToken } from '@authdare/common';


export const LOGIN_SERVICE_TOKEN = genToken()

export interface LoginService<T = LoginCredentials> {
    /**
     * Find user by credentials, prepare token data, and store them in a token, and return the token
     * @param credentials 
     */
    login(credentials: T): Promise<string>;
}