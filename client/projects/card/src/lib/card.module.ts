import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'projects/carousel/src/public-api';

@NgModule({
  declarations: [CardComponent, BasicCardComponent, ProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CarouselModule,
    RouterModule,
  ],
  exports: [CardComponent, BasicCardComponent],
})
export class CardModule {}
