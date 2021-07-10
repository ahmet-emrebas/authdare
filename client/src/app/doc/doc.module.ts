import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { RouterModule } from '@angular/router';
import { ChartComponent, ChartModule } from 'projects/chart/src/public-api';
import { FormComponent, FormModule } from 'projects/form/src/public-api';
import { SidenavModule } from 'projects/sidenav/src/public-api';

@NgModule({
  declarations: [DocComponent],
  imports: [
    CommonModule,
    FormModule,
    ChartModule,
    SidenavModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocComponent,
        children: [
          { path: 'chart', component: ChartComponent },
          { path: 'form', component: FormComponent },
        ],
      },
    ]),
  ],
})
export class DocModule {}
