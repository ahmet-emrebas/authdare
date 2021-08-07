import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenStoreService {
    private readonly tokens: string[] = [];

    /**
     * Generate a new token an store it. You can check the token exist or not using isExist method
     * @returns string token
     */
    gen() {
        const token = uuid();
        this.tokens.push(token);
        return token;
    }

    /**
     * Check the token exist or not, and return boolean, and delete the token from list
     * @param token
     * @returns
     */
    verify(token: string) {
        const __index = this.tokens.findIndex((e) => e == token);
        if (__index == -1) {
            return false;
        }
        this.tokens.splice(__index, 1);
        return true;
    }

    clear() {
        this.tokens.splice(0, this.tokens.length);
    }
}
