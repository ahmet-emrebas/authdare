import { routeAnimations } from './../../route-animations';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', './../home.component.scss'],
    animations: routeAnimations,
})
export class LoginComponent implements OnInit {
    readonly email = new FormControl('', [Validators.email]);
    readonly password = new FormControl('', [
        Validators.max(100),
        Validators.min(6),
    ]);

    readonly loginForm = new FormGroup({
        email: this.email,
        password: this.password,
    });

    readonly errorStateMatcher = LoginErrorStateMatcher(this.loginForm);
    $serverMessage = new BehaviorSubject('');

    constructor(private readonly loginService: LoginService) {}

    ngOnInit(): void {}

    async login() {
        (this.loginForm as any)['submitted'] = true;
        if (this.loginForm.valid) {
            const response: any = await this.loginService.login(
                this.loginForm.value,
            );

            this.$serverMessage.next(response.message);
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

        this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    }
}
