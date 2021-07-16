import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GreetingModule } from '@authdare/greeting';
import { SidenavModule } from '@authdare/sidenav';
import { MaterialDocComponent } from './material-doc.component';
import { GreetingDocComponent } from './greeting-doc/greeting-doc.component';
import { SidenavDocComponent } from './sidenav-doc/sidenav-doc.component';

@NgModule({
  declarations: [
    MaterialDocComponent,
    GreetingDocComponent,
    SidenavDocComponent,
  ],
  imports: [
    CommonModule,
    GreetingModule,
    SidenavModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialDocComponent,
        children: [
          {
            path: 'GreetingComponent',
            component: GreetingDocComponent,
          },
          {
            path: 'SidenavComponent',
            component: SidenavDocComponent,
          },
        ],
      },
    ]),
  ],
})
export class MaterialDocModule {}
