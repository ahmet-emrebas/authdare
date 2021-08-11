import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ForgotPasswordService {
    constructor(private http: HttpClient) {}

    async forgotPassword(email: string) {
        const forgotPassword = this.http.post('/auth/forgot-password', { email });
        try {
            const res = await firstValueFrom(forgotPassword);
            return res;
        } catch (error: any) {
            return error.error;
        }
    }

    async verifyCode(email: string, code: string) {
        const verifyCode = this.http.post('/auth/forgot-password', { email, code });
        try {
            const res = await firstValueFrom(verifyCode);
            return res;
        } catch (error: any) {
            return error.error;
        }
    }
}
