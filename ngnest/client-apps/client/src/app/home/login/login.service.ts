import { firstValueFrom } from 'rxjs';
import { LoginForm } from './login-form';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    constructor(private readonly http: HttpClient) {}
    async login(loginForm: LoginForm) {
        const login = this.http.post('/auth/login', loginForm);
        try {
            await this.reset();
            return await firstValueFrom(login);
        } catch (error: any) {
            return error.error;
        }
    }

    async reset() {
        const reset = this.http.post('/auth/reset', {});
        try {
            return await firstValueFrom(reset);
        } catch (err: any) {
            return err.error;
        }
    }
}
