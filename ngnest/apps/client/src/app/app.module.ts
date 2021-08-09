import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Material Modules
        MatSlideToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        TextFieldModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,

        // --- Material Modues

        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        StoreModule.forRoot({}, {}),
        EntityDataModule.forRoot(entityConfig),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
