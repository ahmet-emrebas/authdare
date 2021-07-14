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
  CarouselComponent,
  CarouselModule,
} from 'projects/carousel/src/public-api';
import { TableComponent, TableModule } from 'projects/table/src/public-api';
import { CarouselNavigationComponent } from 'projects/carousel/src/lib/carousel-navigation/carousel-navigation.component';
import { CarouselPersistentComponent } from 'projects/carousel/src/lib/carousel-persistent/carousel-persistent.component';

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
    TableModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocComponent,
        children: [
          { path: 'table', component: TableComponent },
          { path: 'chart', component: ChartComponent },
          { path: 'form', component: FormComponent },
          { path: 'navbar', component: NavbarComponent },
          { path: 'basic-card', component: BasicCardComponent },
          { path: 'product-card', component: ProductCardComponent },
          {
            path: 'carousel-navigation',
            component: CarouselNavigationComponent,
          },
          { path: 'carousel', component: CarouselPersistentComponent },
        ],
      },
    ]),
  ],
})
export class DocModule {}
