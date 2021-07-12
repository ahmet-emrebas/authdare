import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [CardComponent, BasicCardComponent, ProductCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [CardComponent, BasicCardComponent],
})
export class CardModule {}
