import { genToken } from '@authdare/common';


export const SIGNUP_SERVICE_TOKEN = genToken()

export class SignupService {
    /**
     * Find user by credentials, prepare token data, and store them in a token, and return the token
     * @param credentials 
     */
    signup<U = any>(signupDto: U): Promise<string> {
        throw new Error('Not implemented!');
    }
}