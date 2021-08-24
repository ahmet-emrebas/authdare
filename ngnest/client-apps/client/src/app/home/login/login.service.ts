import { firstValueFrom } from 'rxjs';
import { LoginForm } from './login-form';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_PATH } from '../../api-path.provider';

@Injectable()
export class LoginService {
    constructor(
        private readonly http: HttpClient,
        @Inject(API_PATH) private readonly apiPath: string,
    ) {}
    async login(loginForm: LoginForm) {
        const login = this.http.post(`${this.apiPath}auth/login`, loginForm);
        try {
            return await firstValueFrom(login);
        } catch (error: any) {
            return error.error;
        }
    }
}
