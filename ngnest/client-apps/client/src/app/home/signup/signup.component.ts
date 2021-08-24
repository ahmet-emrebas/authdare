import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from './signup.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { fadeInOut, routeAnimations } from '../../animations';
import { Router } from '@angular/router';

const SignupErrorStateMatcher = (formGroup: FormGroup) =>
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
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss', './../home.component.scss'],
    animations: [...routeAnimations, fadeInOut],
})
export class SignupComponent implements OnInit {
    readonly email = new FormControl('', [Validators.email]);
    readonly password = new FormControl('', [Validators.maxLength(100), Validators.minLength(6)]);
    readonly orgname = new FormControl('', [Validators.max(50), Validators.min(3)]);

    readonly signupForm = new FormGroup({
        email: this.email,
        password: this.password,
        orgname: this.orgname,
    });

    readonly errorStateMatcher = SignupErrorStateMatcher(this.signupForm);
    $serverMessage = new BehaviorSubject('');

    constructor(
        private readonly signupService: SignupService,
        private readonly snackBar: MatSnackBar,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {}

    async signup() {
        (this.signupForm as any)['submitted'] = true;
        if (this.signupForm.valid) {
            const res: any = await this.signupService.signup(this.signupForm.value);

            if (res.statusCode >= 400) {
                this.$serverMessage.next(res.message);
                return;
            }
            this.router.navigate(['/login']);
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

    snack(err: string) {
        this.snackBar.open(`Copied to clipboard, ${err}`, undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'snack',
        });
    }
}
