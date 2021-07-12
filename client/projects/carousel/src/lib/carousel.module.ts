import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { CarouselComponent } from './carousel.component';
import { CarouselService } from './carousel.service';
import { entityConfig } from './entity-metadata';
import { WrapPipe } from './wrap.pipe';

@NgModule({
  declarations: [CarouselComponent, WrapPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forFeature([]),
  ],
  providers: [CarouselService],
  exports: [CarouselComponent],
})
export class CarouselModule {}
