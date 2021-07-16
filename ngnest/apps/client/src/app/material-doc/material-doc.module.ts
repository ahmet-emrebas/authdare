import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GreetingModule, GreetingComponent } from '@authdare/greeting';
import { MaterialDocComponent } from './material-doc.component';
import { GreetingDocComponent } from './greeting-doc/greeting-doc.component';

@NgModule({
  declarations: [MaterialDocComponent, GreetingDocComponent],
  imports: [
    CommonModule,
    GreetingModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialDocComponent,
        children: [
          {
            path: 'GreetingComponent',
            component: GreetingComponent,
          },
        ],
      },
    ]),
  ],
})
export class MaterialDocModule {}
