import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '@authdare/sidenav';
import { MaterialDocComponent } from './material-doc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '@authdare/navbar';
import { NavbarDocComponent } from './navbar-doc/navbar-doc.component';
import { TableDocComponent } from './table-doc/table-doc.component';
import { TableModule } from '@authdare/table';
import { CarouselDocComponent } from './carousel-doc/carousel-doc.component';
import { CarouselModule } from '@authdare/carousel';
import { FormModule } from '@authdare/form';
import { FormDocComponent } from './form-doc/form-doc.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartDocComponent } from './chart-doc/chart-doc.component';
import { ChartModule } from '@authdare/chart';

@NgModule({
  declarations: [
    MaterialDocComponent,
    NavbarDocComponent,
    TableDocComponent,
    CarouselDocComponent,
    FormDocComponent,
    ChartDocComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidenavModule,
    NavbarModule,
    TableModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,

    MatInputModule,
    ChartModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialDocComponent,
        children: [
          {
            path: 'NavbarComponent',
            component: NavbarDocComponent,
          },
          {
            path: 'TableComponent',
            component: TableDocComponent,
          },
          {
            path: 'CarouselComponent',
            component: CarouselDocComponent,
          },
          {
            path: 'FormComponent',
            component: FormDocComponent,
          },
          {
            path: 'ChartComponent',
            component: ChartDocComponent,
          },
        ],
      },
    ]),
  ],
})
export class MaterialDocModule {}
