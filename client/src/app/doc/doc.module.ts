import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { RouterModule } from '@angular/router';
import { ChartComponent, ChartModule } from 'projects/chart/src/public-api';
import { FormComponent, FormModule } from 'projects/form/src/public-api';
import { SidenavModule } from 'projects/sidenav/src/public-api';
import { NavbarComponent, NavbarModule } from 'projects/navbar/src/lib';

@NgModule({
  declarations: [DocComponent],
  imports: [
    CommonModule,
    FormModule,
    ChartModule,
    SidenavModule,
    NavbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocComponent,
        children: [
          { path: 'chart', component: ChartComponent },
          { path: 'form', component: FormComponent },
          { path: 'navbar', component: NavbarComponent },
        ],
      },
    ]),
  ],
})
export class DocModule {}
