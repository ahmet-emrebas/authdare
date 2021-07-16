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
import { CarouselNavigationComponent } from './carousel-navigation/carousel-navigation.component';
import { StoreModule } from '@ngrx/store';
import { CarouselPersistentComponent } from './carousel-persistent/carousel-persistent.component';

@NgModule({
  declarations: [
    CarouselComponent,
    WrapPipe,
    CarouselNavigationComponent,
    CarouselPersistentComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('carousel-navigation', {}),
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forFeature([]),
  ],
  providers: [CarouselService],
  exports: [
    CarouselComponent,
    CarouselNavigationComponent,
    CarouselPersistentComponent,
  ],
})
export class CarouselModule {}
