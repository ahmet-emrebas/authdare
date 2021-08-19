import { routeAnimations, fadeInOut } from '../../animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

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
    animations: [...routeAnimations, fadeInOut],
})
export class LoginComponent implements OnInit, OnDestroy {
    readonly email = new FormControl('', [Validators.email]);
    readonly password = new FormControl('', [Validators.min(6)]);
    private readonly _csrf = new FormControl('EFlgOdQwLIOiHob-JVl-QwaP');
    readonly subsink = new SubSink();
    readonly loginForm = new FormGroup({
        email: this.email,
        password: this.password,
    });

    readonly errorStateMatcher = LoginErrorStateMatcher(this.loginForm);

    constructor(
        private readonly loginService: LoginService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subsink.unsubscribe();
    }

    async login() {
        console.log(document.cookie);
        console.log(this.loginForm.value);
        (this.loginForm as any)['submitted'] = true;
        if (this.loginForm.valid) {
            const res: any = await this.loginService.login(this.loginForm.value);
            if (res?.statusCode >= 400) {
                if (res?.message == 'User not found!') {
                    this.loginForm.setValue({});
                } else if (res.message == 'Wrong password!') {
                    this.password.setValue('');
                }
                this.snack(res.message, 'snack-error');
                return;
            }
            this.snack(res.message, 'snack-info');
        }
    }

    /**
     * Password Show-Hide
     */
    passwordIcon = 'visibility';
    passwordType = 'password';
    tooblePasswordVisibility() {
        this.passwordIcon = this.passwordIcon == 'visibility' ? 'visibility_off' : 'visibility';

        this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    }

    snack(message: string, type?: 'snack-info' | 'snack-error') {
        this.snackBar.open(message, undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: type || 'snack',
        });
    }

    navigate(route: string) {
        this.router.navigate([route]);
    }
}
