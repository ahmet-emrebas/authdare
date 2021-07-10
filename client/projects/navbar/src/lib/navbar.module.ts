import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { entityConfig } from './entity-metadata';
import { NavbarComponent } from './navbar.component';
import { NavbarService } from './navbar.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forFeature([]),
  ],
  providers: [NavbarService],
  exports: [NavbarComponent],
})
export class NavbarModule {}
