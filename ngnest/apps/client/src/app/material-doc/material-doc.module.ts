import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '@authdare/sidenav';
import { MaterialDocComponent } from './material-doc.component';
import { SidenavDocComponent } from './sidenav-doc/sidenav-doc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '@authdare/navbar';
import { NavbarDocComponent } from './navbar-doc/navbar-doc.component';

@NgModule({
  declarations: [MaterialDocComponent, NavbarDocComponent, SidenavDocComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidenavModule,
    NavbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: MaterialDocComponent,
        children: [
          {
            path: 'SidenavComponent',
            component: SidenavDocComponent,
          },

          {
            path: 'NavbarComponent',
            component: NavbarDocComponent,
          },
        ],
      },
    ]),
  ],
})
export class MaterialDocModule {}
