import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { pageName: 'Home' },
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { pageName: 'Login' },
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { pageName: 'Signup' },
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { pageName: 'Password Reset' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
