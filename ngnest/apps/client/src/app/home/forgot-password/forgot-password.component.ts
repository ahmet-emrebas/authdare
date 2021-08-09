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
import { ForgotPasswordService } from './password.service';

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

    readonly forgotPasswordForm = new FormGroup({
        email: this.email,
    });

    readonly errorStateMatcher = ForgotPasswordErrorStateMatcher(
        this.forgotPasswordForm,
    );
    $serverMessage = new BehaviorSubject('');

    constructor(
        private readonly passwordService: ForgotPasswordService,
        private readonly snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {}

    async forgotPassword() {
        (this.forgotPasswordForm as any)['submitted'] = true;
        if (this.forgotPasswordForm.valid) {
            const response: any = await this.passwordService.forgotPassword(
                this.forgotPasswordForm.value,
            );

            this.$serverMessage.next(response.message);
        }
    }

    snack(err: string) {
        this.snackBar.open(`Copied to clipboard, ${err}`, undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'snack',
        });
    }
}
