import { catchError, firstValueFrom } from 'rxjs';
import { LoginForm } from './login-form';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    constructor(private readonly http: HttpClient) {}
    async login(loginForm: LoginForm) {
        const login = this.http.post('/auth/login', loginForm);
        try {
            const res = await firstValueFrom(login);
            console.log(res);
            return res;
        } catch (err) {
            return (err as HttpErrorResponse).error;
        }
    }
}
