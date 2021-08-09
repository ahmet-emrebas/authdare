import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ForgotPasswordService {
    constructor(private http: HttpClient) {}

    forgotPassword(email: string) {}
}
