import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { RouterModule } from '@angular/router';
import { ChartComponent, ChartModule } from 'projects/chart/src/public-api';
import { FormComponent, FormModule } from 'projects/form/src/public-api';
import { SidenavModule } from 'projects/sidenav/src/public-api';
import { NavbarComponent, NavbarModule } from 'projects/navbar/src/lib';
import { BasicCardComponent, CardModule } from 'projects/card/src/public-api';
import { ProductCardComponent } from 'projects/card/src/lib/product-card/product-card.component';
import {
  ImageCarouselComponent,
  ImageDeckComponent,
  ImageGridComponent,
} from 'projects/image/src/public-api';
import {
  CarouselComponent,
  CarouselModule,
} from 'projects/carousel/src/public-api';

@NgModule({
  declarations: [DocComponent],
  imports: [
    CommonModule,
    FormModule,
    ChartModule,
    SidenavModule,
    NavbarModule,
    CardModule,
    CarouselModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocComponent,
        children: [
          { path: 'chart', component: ChartComponent },
          { path: 'form', component: FormComponent },
          { path: 'navbar', component: NavbarComponent },
          { path: 'basic-card', component: BasicCardComponent },
          { path: 'product-card', component: ProductCardComponent },
          { path: 'image-carousel', component: ImageCarouselComponent },
          { path: 'image-deck', component: ImageDeckComponent },
          { path: 'image-grid', component: ImageGridComponent },
          { path: 'carousel', component: CarouselComponent },
        ],
      },
    ]),
  ],
})
export class DocModule {}
