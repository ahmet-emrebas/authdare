import { Component, OnInit } from '@angular/core';
import { routeAnimations, fadeInOut } from '../../animations';
import { BehaviorSubject } from 'rxjs';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from './forgot-password.service';
import { Router } from '@angular/router';

const ForgotPasswordErrorStateMatcher = (formGroup: FormGroup) =>
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
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss', './../home.component.scss'],
    animations: [...routeAnimations, fadeInOut],
})
export class ForgotPasswordComponent implements OnInit {
    readonly email = new FormControl('', [Validators.email]);
    readonly code = new FormControl('', [Validators.maxLength(100)]);

    readonly forgotPasswordForm = new FormGroup({
        email: this.email,
        code: this.code,
    });

    readonly errorStateMatcher = ForgotPasswordErrorStateMatcher(
        this.forgotPasswordForm,
    );
    $serverMessage = new BehaviorSubject('');

    isCodeSent = false;

    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {}

    async requestVerificationCode() {
        (this.forgotPasswordForm as any)['submitted'] = true;

        if (this.forgotPasswordForm.valid) {
            let res: any;
            res = await this.forgotPasswordService.forgotPassword(this.email.value);
            if (res.statusCode >= 400) {
                this.$serverMessage.next(res.message);
                return;
            }
            this.isCodeSent = true;
            this.snack(res.message, 'snack-info');
        }
    }

    async verifyCode() {
        (this.forgotPasswordForm as any)['submitted'] = true;
        const res = await this.forgotPasswordService.verifyCode(
            this.email.value,
            this.code.value,
        );
        if (res.statusCode >= 400) {
            this.$serverMessage.next(res.message);
            return;
        }
        this.snack(res.message, 'snack-info');
        this.router.navigate(['/login']);
    }

    snack(message: string, type?: 'snack-info' | 'snack-error') {
        this.snackBar.open(message, undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: type || 'snack',
        });
    }
}
