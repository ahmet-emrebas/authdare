import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GreetingModule } from '@authdare/greeting';
import { SidenavModule } from '@authdare/sidenav';
import { MaterialDocComponent } from './material-doc.component';
import { GreetingDocComponent } from './greeting-doc/greeting-doc.component';
import { SidenavDocComponent } from './sidenav-doc/sidenav-doc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MaterialDocComponent,
    GreetingDocComponent,
    SidenavDocComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
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
