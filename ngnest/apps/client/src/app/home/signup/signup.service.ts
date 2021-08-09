import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SignupService {
    constructor(private readonly http: HttpClient) {}

    async signup(signupForm: any) {
        const signup = this.http.post('/auth/signup', signupForm);
        try {
            const res = await firstValueFrom(signup);
            console.log(res);
            return res;
        } catch (err) {
            console.log(err);
            return (err as HttpErrorResponse).error;
        }
    }
}
