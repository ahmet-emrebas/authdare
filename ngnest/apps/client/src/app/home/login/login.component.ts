import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { LoginService } from './login.service';

const LoginErrorStateMatcher = (formGroup: FormGroup) =>
    new (class ErrorMatcher implements ErrorStateMatcher {
        isErrorState(
            control: FormControl | null,
            form: FormGroupDirective | NgForm | null,
        ): boolean {
            if ((formGroup as any)['submitted']) {
                return control?.errors ? true : false;
            }
            return false;
        }
    })();

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.email]),
        password: new FormControl('', [Validators.max(100), Validators.min(6)]),
    });
    errorStateMatcher = LoginErrorStateMatcher(this.loginForm);

    constructor(private readonly loginService: LoginService) {}

    ngOnInit(): void {}

    login() {
        (this.loginForm as any)['submitted'] = true;
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value);
        }
    }

    /**
     * Password Show-Hide
     */
    passwordIcon = 'visibility';
    passwordType = 'password';
    tooblePasswordVisibility() {
        this.passwordIcon =
            this.passwordIcon == 'visibility' ? 'visibility_off' : 'visibility';

        this.passwordType =
            this.passwordType == 'password' ? 'text' : 'password';
    }
}
