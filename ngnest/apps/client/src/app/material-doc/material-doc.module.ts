import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GreetingModule, GreetingComponent } from '@authdare/greeting';
import { MaterialDocComponent } from './material-doc.component';

@NgModule({
  declarations: [MaterialDocComponent],
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
