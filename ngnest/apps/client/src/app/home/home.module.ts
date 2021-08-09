import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from './login/login.service';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
    declarations: [HomeComponent, LoginComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('home', {}),
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ClipboardModule,
        MatSnackBarModule,
    ],
    providers: [LoginService],
})
export class HomeModule {}
