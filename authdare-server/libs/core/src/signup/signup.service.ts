import { genToken } from '@authdare/common';

export const SIGNUP_SERVICE_TOKEN = genToken();

export interface SignupService<T = any> {
  /**
   * Find user by credentials, prepare token data, and store them in a token, and return the token
   * @param credentials
   */
  signup(signupDto: T): Promise<string>;

}
