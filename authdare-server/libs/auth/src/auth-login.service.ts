import { LoginService } from "@authdare/core";
import { Injectable } from "@nestjs/common";


/**
 * First Implementation of LoginService
 */
@Injectable()
export class AuthLoginService implements LoginService {

    login<U = any>(credentials: U): Promise<string> {
        return new Promise((res, rej) => res('Generated Token'))
    }
}